import { SetMetadata } from '@nestjs/common';

import { PermissionsEnum } from '@/shared/permissions/enums';
import { PERMISSIONS_METADATA_KEY } from '@/shared/permissions/tokens';

export const Permissions = (...permissions: PermissionsEnum[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
