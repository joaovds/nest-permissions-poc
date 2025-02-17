import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_SERVICE } from '@/shared/database/tokens';
import { DatabaseInterface } from '@/shared/database/interfaces';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly pg: DatabaseInterface,
  ) {}

  async hasPermission({
    userID,
    entityID,
    permissionID,
  }: PermissionsService.HasPermissionParams) {
    const result = await this.pg
      .query<{ has_permission: boolean }>(
        `
      WITH user_specific_permission AS (
        SELECT 1
        FROM entity_permissions ep
        JOIN permissions per ON ep.permission_id = per.id
        WHERE ep.user_id = $1
          AND per.id = $2
          AND ep.entity_id = $3
          AND ep.is_denied = false
      ),
      user_denied_permission AS (
        SELECT 1
        FROM entity_permissions ep
        JOIN permissions per ON ep.permission_id = per.id
        WHERE ep.user_id = $1
          AND per.id = $2
          AND ep.entity_id = $3
          AND ep.is_denied = true
      ),
      user_global_permission AS (
        SELECT 1
        FROM users usr
        JOIN roles rol ON usr.role_id = rol.id
        JOIN role_permissions rp ON rol.id = rp.role_id
        JOIN permissions per ON rp.permission_id = per.id
        WHERE usr.id = $1
          AND per.id = $2
      )
      SELECT 
        (NOT EXISTS (SELECT * FROM user_denied_permission))
        AND (EXISTS (SELECT * FROM user_specific_permission)
          OR EXISTS (SELECT * FROM user_global_permission)
        ) AS "has_permission";
      `,
        [userID, permissionID, entityID],
      )
      .getOne();

    return result ? result.has_permission : false;
  }
}

export namespace PermissionsService {
  export type HasPermissionParams = {
    userID: number;
    entityID: number | null;
    permissionID: number;
  };
}
