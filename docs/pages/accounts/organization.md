---
title: Organization
---

When you want to collaborate with mutliple developers on projects, e.g. working at a company with multiple developers, you can setup an _organization_ and manage access for all developers.

Common situations where Organizations are useful:

- Transferring control of a project
- Sharing access with others
- Isolating expenses for work projects that you need to submit expenses for
- Structuring projects for different contexts (e.g. hobby project, work, client 1, client 2)

## Creating New Organizations

To create a new _organization_, visit [https://expo.io/create-organization](https://expo.io/create-organization) and sign up or in to your _personal account_. You can also create a new Organization by selecting "New Organization" from the account selection dropdown at the top of your dashboard.

> Once you created the _organization_, you can't rename it.

## Associating Projects

Once your organization is up and running, you need to associate your project to this organization. You can do that by defining the [`owner`](../../versions/v38.0.0/config/app/#owner) property in your app manifest. By default, projects without this [`owner`](../../versions/v38.0.0/config/app/#owner) property are associated to the authenticated account.

## Migrating from Teams

todo
