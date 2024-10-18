import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/candidates',
    '/referrals',
    '/openings',
    '/openings/(.*)',
    '/businessModel',
    '/blog',
    '/blog/(.*)',
    '/learn-more',
    '/api/webhook',
    '/thanks',
    '/intake',
    '/api/uploadthing',
    '/api/jobposting',
    '/FAQs',
    '/legal/privacy',
    '/legal/terms',
    '/hiring-manager',
    '/hiring-manager/intake',
    '/hiring-manager/ScheduleTimeToChat',
    '/hiring-manager/dashboard',
    '/via/ref',
  ],
  ignoredRoutes: ['/static', '/_vercel/speed-insights/vitals'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
};
