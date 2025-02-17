import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PERMISSIONS_METADATA_KEY } from '@/shared/permissions/tokens';
import { PermissionsEnum } from '@/shared/permissions/enums';
import { PermissionsService } from '@/shared/permissions/permissions.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<PermissionsEnum>(
      PERMISSIONS_METADATA_KEY,
      ctx.getHandler(),
    );
    if (!requiredPermissions) return true;

    const request = ctx.switchToHttp().getRequest();
    const userID = 3;
    const entityID = request.params.entityID;

    if (!userID) throw new ForbiddenException('Unauthenticated user');

    const hasPermission = await this.permissionsService.hasPermission({
      userID,
      entityID,
      permissionID: Number(requiredPermissions),
    });
    if (!hasPermission) throw new ForbiddenException('User without permission');

    return true;
  }
}
