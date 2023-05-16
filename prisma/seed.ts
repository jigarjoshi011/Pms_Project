// const Roles = [
//   {
//     name: 'Admin',
//   },
//   {
//     name: 'User',
//   },
// ];
// const Permissions = [
//   {
//     name: 'Read',
//   },
//   {
//     name: 'Write',
//   },
//   {
//     name: 'Update',
//   },
//   {
//     name: 'Delete',
//   },
// ];

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// async function seedRoles() {
//   for (const roles of Roles) {
//     await prisma.roles.create({
//       data: roles,
//     });
//   }
// }
// seedRoles()
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });

// async function seedPermissions() {
//   for (const permissions of Permissions) {
//     await prisma.permissions.create({
//       data: permissions,
//     });
//   }
// }
// seedPermissions()
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });

/******newtype code */
// const role_permissions: {
//   roleId: number;
//   permissionId: number;
//   assignedBy: string;
// }[] = [
//   { roleId: 1, permissionId: 1, assignedBy: 'Admin' },
//   { roleId: 1, permissionId: 2, assignedBy: 'Admin' },
//   { roleId: 1, permissionId: 3, assignedBy: 'Admin' },
//   { roleId: 1, permissionId: 4, assignedBy: 'Admin' },
//   { roleId: 2, permissionId: 1, assignedBy: 'Admin' },
//   { roleId: 2, permissionId: 2, assignedBy: 'Admin' },
//   { roleId: 2, permissionId: 3, assignedBy: 'Admin' },
// ];

// async function feedRolePermissions() {
//   for (const r_p of role_permissions) {
//     await prisma.roles_has_Permissions.create({
//       data: r_p,
//     });
//   }
// }
// feedRolePermissions()
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });
