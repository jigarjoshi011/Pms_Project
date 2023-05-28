import * as bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

/****
 * add admin through seeder
 */

async function addAdmin() {
  try {
    const checkEmail = await prisma.users.findUnique({
      where: { email: 'admin@gmail.com' },
    });
    if (checkEmail != null) {
      console.log('hello');
      return { message: 'signup unsuccessful' };
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash('admin@123', saltOrRounds);
    const newUser = await prisma.users.create({
      data: {
        name: 'admin',
        email: 'admin@gmail.com',
        password: hash,
        created_at: `${new Date()}`,
        updated_at: `${new Date()}`,
        Users_has_Roles: {
          create: [
            {
              assignedBy: 'Itself',
              assignedAt: new Date(),
              roleId: 1,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log('🚀 ~ file: seed.ts:128 ~ addAdmin ~ error:', error);
  }
}
addAdmin()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
