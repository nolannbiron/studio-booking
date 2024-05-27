import { Prisma } from '@repo/prisma/client'

type Props = {
	ownerId?: string
	contactId?: string
	teamId: string
}

export const getTodayBookingsSQL = ({ ownerId, contactId, teamId }: Props) =>
	Prisma.sql`
    SELECT 
        TO_CHAR("startDate", 'MM-YYYY') as "monthYear",
        JSON_AGG(JSON_BUILD_OBJECT(
        'id', b."id",
        'title', b."title",
        'content', b."content',
        'startDate', b."startDate",
        'endDate', b."endDate',
        'status', b."status",
        'contact', JSON_BUILD_OBJECT(
            'id', c."id",
            'name', c."name",
            'avatarUrl', c."avatarUrl",
            'email', c."email",
        ),
        'owner', JSON_BUILD_OBJECT(
            'id', o."id",
            'fullName', o."fullName",
            'avatarUrl', o."avatarUrl",
            'email', o."email"
        )
        )) as "bookings"
    FROM "bookings" b
    LEFT JOIN "contacts" c ON b."contactId" = c."id"
    LEFT JOIN "users" o ON b."ownerId" = o."id"
    WHERE 
        ${ownerId ? Prisma.sql`b."ownerId" = ${ownerId}` : Prisma.sql`1=1`}
        ${contactId ? Prisma.sql`AND b."contactId" = ${contactId}` : Prisma.sql`AND 1=1`}
        AND b."teamId" = ${teamId}
        AND b."status" != 'CANCELED'
        AND b."startDate" >= ${new Date(new Date().setHours(0, 0, 0, 0))}::timestamp
        AND b."startDate" <= ${new Date(new Date().setHours(23, 59, 59, 999))}::timestamp
    GROUP BY "monthYear"
    ORDER BY MIN(b."startDate");
`

export const getPastBookingsSQL = ({ ownerId, contactId, teamId }: Props) =>
	Prisma.sql`
    SELECT 
        TO_CHAR("startDate", 'MM-YYYY') as "monthYear",
        JSON_AGG(JSON_BUILD_OBJECT(
        'id', b."id",
        'title', b."title",
        'content', b."content",
        'startDate', b."startDate",
        'endDate', b."endDate",
        'status', b."status",
        'contact', JSON_BUILD_OBJECT(
            'id', c."id",
            'name', c."name",
            'avatarUrl', c."avatarUrl",
            'email', c."email"
        ),
        'owner', JSON_BUILD_OBJECT(
            'id', o."id",
            'fullName', o."fullName",
            'avatarUrl', o."avatarUrl",
            'email', o."email"
        )
        )) as "bookings"
    FROM "bookings" b
    LEFT JOIN "contacts" c ON b."contactId" = c."id"
    LEFT JOIN "users" o ON b."ownerId" = o."id"
    WHERE 
        ${ownerId ? Prisma.sql`b."ownerId" = ${ownerId}` : Prisma.sql`1=1`}
        ${contactId ? Prisma.sql`AND b."contactId" = ${contactId}` : Prisma.sql`AND 1=1`}
        AND b."teamId" = ${teamId}
        AND b."status" != 'CANCELED'
        AND b."startDate" <= ${new Date(new Date().setHours(0, 0, 0, 0))}::timestamp
    GROUP BY "monthYear"
    ORDER BY MIN(b."startDate") DESC;
`

export const getUpcomingBookingsSQL = ({ ownerId, contactId, teamId }: Props) =>
	Prisma.sql`
    SELECT 
        TO_CHAR("startDate", 'MM-YYYY') as "monthYear",
        JSON_AGG(JSON_BUILD_OBJECT(
        'id', b."id",
        'title', b."title",
        'content', b."content",
        'startDate', b."startDate",
        'endDate', b."endDate",
        'status', b."status",
        'contact', JSON_BUILD_OBJECT(
            'id', c."id",
            'name', c."name",
            'avatarUrl', c."avatarUrl",
            'email', c."email"
        ),
        'owner', JSON_BUILD_OBJECT(
            'id', o."id",
            'fullName', o."fullName",
            'avatarUrl', o."avatarUrl",
            'email', o."email"
        )
        )) as "bookings"
    FROM "bookings" b
    LEFT JOIN "contacts" c ON b."contactId" = c."id"
    LEFT JOIN "users" o ON b."ownerId" = o."id"
    WHERE 
        ${ownerId ? Prisma.sql`b."ownerId" = ${ownerId}` : Prisma.sql`1=1`}
        ${contactId ? Prisma.sql`AND b."contactId" = ${contactId}` : Prisma.sql`AND 1=1`}
        AND b."teamId" = ${teamId}
        AND b."status" != 'CANCELED'
        AND b."startDate" > ${new Date(new Date().setHours(23, 59, 59, 999))}::timestamp
    GROUP BY "monthYear"
    ORDER BY MIN(b."startDate");
`

export const getCanceledBookingsSQL = ({ ownerId, contactId, teamId }: Props) =>
	Prisma.sql`
    SELECT 
        TO_CHAR("startDate", 'MM-YYYY') as "monthYear",
        JSON_AGG(JSON_BUILD_OBJECT(
        'id', b."id",
        'title', b."title",
        'content', b."content',
        'startDate', b."startDate",
        'endDate', b."endDate',
        'status', b."status',
        'contact', JSON_BUILD_OBJECT(
            'id', c."id",
            'name', c."name",
            'avatarUrl', c."avatarUrl",
            'email', c."email'
        ),
        'owner', JSON_BUILD_OBJECT(
            'id', o."id",
            'fullName', o."fullName",
            'avatarUrl', o."avatarUrl",
            'email', o."email'
        )
    )) as "bookings"
    FROM "bookings" b
    LEFT JOIN "contacts" c ON b."contactId" = c."id"
    LEFT JOIN "users" o ON b."ownerId" = o."id"
    WHERE 
        ${ownerId ? Prisma.sql`b."ownerId" = ${ownerId}` : Prisma.sql`1=1`}
        ${contactId ? Prisma.sql`AND b."contactId" = ${contactId}` : Prisma.sql`AND 1=1`}
        AND b."teamId" = ${teamId}
        AND b."status" = 'CANCELED'
    GROUP BY "monthYear"
    ORDER BY MIN(b."startDate");
`
