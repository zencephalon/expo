---
title: Working Together
---

You can add other Expo users or members to your Personal Account and Organizations. Members have access to all of the projects belonging to the Personal Accounts or Organization. The type of access depends on the given role.

## Adding Members

You can invite new members to your Personal Account, or any Organizations you administrate, from the members page under Settings at [https://expo.io/dashboard/ORGANIZATION/settings/members](https://expo.io/dashboard/ORGANIZATION/settings/members). You can only add existing Expo users as a member, you can direct them to [https://expo.io/signup](https://expo.io/signup) if they don't have an account yet.

> When adding new developers to your projects, who are publishing updates or create new builds, make sure to add the [`owner`](../../versions/latest/config/app/#owner) property to your project app manifest.

## Managing Access

Access for members is managed through a role-based system. Users can have the _owner_, _admin_, _developer_, or _viewer_ role within a Personal Account or Organization

| Role          | Description                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Owner**     | Can take any action on the account or on any projects, even deleting them.                                                                            |
| **Admin**     | Can control most settings on your account, including signing up for paid services, change permissions of other users, and manage programmatic access. |
| **Developer** | Can create new projects, make new builds, release updates, and manage credentials.                                                                    |
| **Viewer**    | Can only view your projects through the Expo Client, but can't modify your projects in any way.                                                       |

> When you create an Organization from a Personal Account, you are automatically designated as the only owner.

## Removing members

You can remove other Members from the Organizations you administrate. To remove Members, go to the Expo Dashboard Settings page at [https://expo.io/dashboard/ORGANIZATION/settings/members](https://expo.io/dashboard/ORGANIZATION/settings/members).
