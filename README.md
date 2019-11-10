## Description

NestJS + GraphQL Example

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Implementation Details

### 1. Setup the GraphQL Server with HTTP Context

The first step to setup GraphQL in NestJS is to import the `GraphQLModule` from `@nestjs/graphql` into the `AppModule` in `app.module.ts`.

#### HTTP Context

In order for GraphQL requests to access request headers (needed later for authentication), we need to use the GraphQLModule `context` option.

```typescript
// Location: src/app.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

[Example: ./src/app.module.ts](./src/app.module.ts)

### 2. Auto-Generated GraphQL Schema

The GraqhQL schema is generated automatically using decorators from `@nestjs/graphql` and [TypeGraphQL](https://typegraphql.ml).

1. **[Types and Fields Example](./src/users/users.entity.ts)**
   - [Reference](https://typegraphql.ml/docs/types-and-fields.html)
1. **[Resolver Example](./src/users/users.resolver.ts)**
   - [Reference](https://typegraphql.ml/docs/resolvers.html)
   - **Note:** The `@Resolver()` and `@Args()` decorators used come from `@nestjs/graphql` instead of `type-graphql`.

### 3. Authentication

The GraphQL specification doesn't cover authentication, but we can create an `AuthModule` in NestJS that handles:

1. User Login
   1. [Using an AuthService](./src/auth/auth.service.ts)
1. JWT Signing
   1. [Import and Setup the JwtModule](./src/auth/auth.module.ts)
   1. [Consume JwtService](./src/auth/auth.service.ts)
1. JWT Auth Guard
   1. [Create JwtStrategy](./src/auth/jwt.strategy.ts)
   1. [Create GraphQLAuthGuard](./src/auth/auth.guard.ts)
   1. [Provide JwtStrategy and GraphQLAuthGuard to AuthModule](./src/auth/auth.module.ts)
1. Current User Context
   1. [Create a @CurrentUser decorator](./src/auth/currentuser.decorator.ts)
   1. [Provide CurrentUser to AuthModule](./src/auth/auth.module.ts)
