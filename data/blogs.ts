import type { BlogPost } from '@/lib/types'

// TODO: when the blog API lands, replace this constant with an async fetcher
// (e.g. `export async function getBlogPosts()` wrapped in React `cache()`)
// and update `generateStaticParams` + add `export const revalidate = ...`
// in `app/blog/[slug]/page.tsx`. The block shape already serializes to JSON 1:1.
export const blogPosts: BlogPost[] = [
  {
    slug: 'serverless-apis-with-aws-cdk',
    title: 'Lessons from Building Serverless APIs with AWS CDK',
    excerpt:
      'Five things I wish I knew before my first CDK stack hit production. Constructs, drift, IAM, and the joy of a clean diff.',
    date: '2026-05-20',
    tags: ['AWS', 'CDK', 'Serverless'],
    coverImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    body: [
      {
        type: 'paragraph',
        text: 'CDK is the first IaC tool that felt like writing real code. Loops, types, refactors — all the things YAML pretends to support. After a few years shipping serverless stacks across teams, here are the lessons that stuck.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Treat constructs as the unit of reuse',
      },
      {
        type: 'paragraph',
        text: 'The mistake I made early on was building one giant Stack class and calling it modular because the methods were small. A construct is not a method — it is a tiny, composable piece of infra with its own identity in the synth graph. Pulling logical groups (API + Lambda + table) into their own constructs makes the deploy diff legible and the blast radius small.',
      },
      {
        type: 'code',
        language: 'typescript',
        filename: 'lib/constructs/orders-api.ts',
        code: `import { Construct } from 'constructs'
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Table, AttributeType } from 'aws-cdk-lib/aws-dynamodb'

export class OrdersApi extends Construct {
  readonly api: RestApi

  constructor(scope: Construct, id: string) {
    super(scope, id)

    const table = new Table(this, 'OrdersTable', {
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
    })

    const handler = new NodejsFunction(this, 'Handler', {
      entry: 'src/handlers/orders.ts',
      environment: { TABLE_NAME: table.tableName },
    })

    table.grantReadWriteData(handler)

    this.api = new RestApi(this, 'Api')
    this.api.root.addResource('orders').addMethod('POST', new LambdaIntegration(handler))
  }
}`,
      },
      {
        type: 'heading',
        level: 2,
        text: 'cdk diff is your friend; never deploy without it',
      },
      {
        type: 'paragraph',
        text: 'Most production incidents I caused early on came from skipping the diff. A clean diff against the target environment is the cheapest insurance you can buy. Wire it into your shell history so it is muscle memory.',
      },
      {
        type: 'code',
        language: 'bash',
        code: `# What I run before every deploy
pnpm cdk diff --profile prod-readonly OrdersStack

# If the diff looks clean
pnpm cdk deploy --profile prod --require-approval never OrdersStack`,
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
        alt: 'Wiring diagram of stack constructs feeding into a single deploy graph',
        caption:
          'A clean construct graph reads like a wiring diagram — every box has one job.',
        width: 1200,
        height: 800,
      },
      {
        type: 'heading',
        level: 2,
        text: 'IAM least-privilege, by default',
      },
      {
        type: 'paragraph',
        text: 'CDK gives you ergonomic grants (`table.grantReadData(fn)`) — use them. Avoid `*` on resources unless you have written a TODO with a date next to it. Future you, paged at 2am, will thank present you for the narrow blast radius.',
      },
      {
        type: 'list',
        items: [
          'Prefer grants over manual `PolicyStatement` whenever possible',
          'Tag every resource with `owner` and `stage` so cost reports actually mean something',
          'Pin your CDK version per app; bumping it across stacks is rarely a small change',
        ],
      },
      {
        type: 'quote',
        text: 'Infrastructure as code is only as good as the code review around it.',
      },
      {
        type: 'paragraph',
        text: 'CDK does not protect you from yourself. Treat infra PRs with the same rigor as application PRs — same reviewers, same lint rules, same blame trail. The wins compound.',
      },
    ],
  },
  {
    slug: 'dynamodb-single-table-design',
    title: 'Why DynamoDB Single-Table Design Finally Clicked',
    excerpt:
      'I avoided single-table design for two years because it felt unnatural. Here is the mental shift that made it obvious.',
    date: '2026-04-08',
    tags: ['DynamoDB', 'AWS', 'Data Modeling'],
    coverImage:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&q=80',
    body: [
      {
        type: 'paragraph',
        text: 'Single-table design is one of those topics where every blog post explains the same example and you still walk away confused. I avoided it for two years and built four tables for every microservice like a good relational citizen. Then I worked on a system that scaled, and the lesson landed at once.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The mental shift',
      },
      {
        type: 'quote',
        text: 'Stop modeling entities. Start modeling access patterns.',
        cite: 'Rick Houlihan, paraphrased',
      },
      {
        type: 'paragraph',
        text: 'In Postgres you design tables and then figure out queries. In DynamoDB you design queries and then figure out tables. The order is reversed because the cost of a wrong access pattern is not slow — it is structurally impossible.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'A worked example',
      },
      {
        type: 'paragraph',
        text: 'Say we have users, orders, and order items. The access patterns are: get a user, list a user\'s orders, get an order with all its items. Three patterns. One table.',
      },
      {
        type: 'code',
        language: 'typescript',
        filename: 'src/repo/orders.ts',
        code: `// USER#<userId>          #META          → user profile
// USER#<userId>          ORDER#<orderId> → order summary (for list)
// ORDER#<orderId>        #META          → order detail
// ORDER#<orderId>        ITEM#<itemId>   → order line item

async function getUserWithOrders(userId: string) {
  const res = await client.send(new QueryCommand({
    TableName: TABLE,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: { ':pk': \`USER#\${userId}\` },
  }))
  // res.Items is [user, ...orders] in one round trip
  return res.Items
}`,
      },
      {
        type: 'paragraph',
        text: 'One query, one round trip, every related record. That is the whole game. Once the model clicks, you stop thinking "this would be a JOIN" and start thinking "what is the partition key here".',
      },
      {
        type: 'heading',
        level: 2,
        text: 'When NOT to do this',
      },
      {
        type: 'list',
        items: [
          'When access patterns will change weekly — single-table is brittle to schema drift',
          'When you need ad-hoc analytical queries — that is what Athena over S3 is for',
          'When the team is uncomfortable with the indirection — readability beats elegance',
        ],
      },
      {
        type: 'paragraph',
        text: 'For everything else — high-throughput, well-understood domains, predictable access patterns — single-table is hard to beat. The first table you build this way is awkward. The second one feels obvious.',
      },
    ],
  },
  {
    slug: 'cra-to-app-router-migration',
    title: 'Migrating a React App from CRA to Next.js App Router',
    excerpt:
      'A real-world migration: what broke, what got faster, and the patterns I would copy on day one of the next project.',
    date: '2026-02-22',
    tags: ['React', 'Next.js', 'Migration'],
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
    body: [
      {
        type: 'paragraph',
        text: 'CRA was deprecated. We had a 4-year-old React app on it. Sitting still was the worst option, so we migrated to Next.js App Router over a quarter. Here is what actually happened — not the marketing version.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The plan that worked',
      },
      {
        type: 'paragraph',
        text: 'We did not rewrite. We did a route-by-route port behind a reverse proxy: Next.js owned new routes, the old CRA app owned everything else, and a thin nginx config in front decided who served what. This let us ship value in week one and avoid a six-month "the rewrite is almost done" project.',
      },
      {
        type: 'code',
        language: 'bash',
        filename: 'nginx.conf (excerpt)',
        code: `# New surface area goes to Next; legacy stays where it is
location /dashboard { proxy_pass http://next-app:3000; }
location /settings  { proxy_pass http://next-app:3000; }
location /          { proxy_pass http://legacy-cra:5000; }`,
      },
      {
        type: 'heading',
        level: 3,
        text: 'What broke',
      },
      {
        type: 'list',
        items: [
          'Anything using `process.env` at runtime — App Router only exposes `NEXT_PUBLIC_*` to the client',
          'React Context providers that wrapped the whole app — they now have to be `"use client"` Client Components inside a Server Component layout',
          'Tests using `react-router-dom` mocks — App Router uses `next/navigation`, totally different API',
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=1200&q=80',
        alt: 'Side-by-side bar chart of before and after metrics',
        caption: 'TTFB and JS bundle size after the migration, on the routes we ported.',
        width: 1200,
        height: 800,
      },
      {
        type: 'heading',
        level: 2,
        text: 'What got dramatically better',
      },
      {
        type: 'paragraph',
        text: 'Server Components let us delete an entire class of "fetch in useEffect" code. The data lived where it was used, the loading states became `loading.tsx`, and the bundle dropped because none of that fetching code shipped to the browser anymore.',
      },
      {
        type: 'code',
        language: 'typescript',
        filename: 'app/dashboard/page.tsx',
        code: `// Before: client component, useEffect, useState, error boundary, loading state
// After: a single async function

export default async function Dashboard() {
  const metrics = await getMetrics()  // runs on the server
  return <MetricsView data={metrics} />
}`,
      },
      {
        type: 'quote',
        text: 'The best refactor is the one you can ship behind a proxy on day one.',
      },
      {
        type: 'paragraph',
        text: 'If I were starting this migration again, I would have moved auth and session handling to the new app first — every route that came after benefited from it. Plumbing is unsexy and it pays.',
      },
    ],
  },
  {
    slug: 'typescript-patterns-i-reach-for',
    title: 'TypeScript Patterns I Reach For Every Day',
    excerpt:
      'Five patterns that have earned their place in my toolbox. Nothing exotic — just the ones that have paid for themselves repeatedly.',
    date: '2026-01-12',
    tags: ['TypeScript', 'Patterns', 'DX'],
    coverImage:
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1200&q=80',
    body: [
      {
        type: 'paragraph',
        text: 'I have written a lot of clever TypeScript. Most of it I have deleted. These are the patterns that stayed — boring, predictable, and worth their weight every single week.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. Tagged unions over flag fields',
      },
      {
        type: 'paragraph',
        text: 'A `status: string` field invites bugs. A discriminated union forces every branch to handle every state. Exhaustiveness checking does the policing for free.',
      },
      {
        type: 'code',
        language: 'typescript',
        code: `type Request =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; data: User }
  | { type: 'error'; message: string }

function view(req: Request) {
  switch (req.type) {
    case 'idle':    return <Start />
    case 'loading': return <Spinner />
    case 'success': return <Profile user={req.data} />
    case 'error':   return <Error message={req.message} />
    // delete a case and the compiler tells you exactly where it broke
  }
}`,
      },
      {
        type: 'heading',
        level: 2,
        text: '2. Brand types for things that look the same but are not',
      },
      {
        type: 'paragraph',
        text: 'A `userId` and an `orderId` are both strings. The compiler does not care. Brand them and it does.',
      },
      {
        type: 'code',
        language: 'typescript',
        code: `type Branded<T, B> = T & { readonly __brand: B }
type UserId = Branded<string, 'UserId'>
type OrderId = Branded<string, 'OrderId'>

const userId = '...' as UserId
function fetchOrder(id: OrderId) { /* ... */ }

fetchOrder(userId) // Error — UserId is not assignable to OrderId`,
      },
      {
        type: 'heading',
        level: 2,
        text: '3. `satisfies` for config objects',
      },
      {
        type: 'paragraph',
        text: 'The single most underused TypeScript feature. It validates without widening — your literal types stay literal.',
      },
      {
        type: 'code',
        language: 'typescript',
        code: `const routes = {
  home: '/',
  blog: '/blog',
  contact: '/contact',
} satisfies Record<string, \`/\${string}\`>

routes.home  // type is '/', not string`,
      },
      {
        type: 'heading',
        level: 2,
        text: '4. Result types instead of throwing',
      },
      {
        type: 'paragraph',
        text: 'For domain errors — the ones that are part of your business logic — return them. Throw only for invariants that should never happen. This makes error handling visible at the call site.',
      },
      {
        type: 'code',
        language: 'typescript',
        code: `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }

async function chargeCard(amount: number): Promise<Result<Receipt, ChargeError>> {
  // ...
}

const result = await chargeCard(100)
if (!result.ok) return showError(result.error)
return showReceipt(result.value)`,
      },
      {
        type: 'heading',
        level: 2,
        text: '5. Inferred types over hand-written ones',
      },
      {
        type: 'list',
        items: [
          'Write the runtime shape. Let TypeScript infer the type with `typeof` / `ReturnType`.',
          'Use Zod or Valibot at boundaries and infer the type from the schema — one source of truth.',
          'Avoid `interface` for data; use `type` plus inference. Reach for `interface` only when extension is the point.',
        ],
      },
      {
        type: 'paragraph',
        text: 'None of these are clever. That is the point. Clever TypeScript is fun to write and miserable to maintain. The patterns above all have one thing in common: they make the compiler do work that humans were doing badly.',
      },
    ],
  },
]
