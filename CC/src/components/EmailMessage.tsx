import { ClientReferralEmailMessageProps } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const EmailMessage = ({
  emailFirstName,
  userFirstName,
  userLastName,
  emailCompany,
}: ClientReferralEmailMessageProps) => {
  return (
    <Card className="w-full  bg-gray-400 mt-5 pt-2">
      <CardContent>
        <div>
          <p>
            Hi {emailFirstName} - {userFirstName} {userLastName} (CC&apos;d) recently shared your contact information and suggested we connect.
          </p>
          <br />
          <p>
          Coder Collective is a San Francisco-based recruitment firm specializing in direct hire placements for top-tier software engineers. Through connections with individuals like {userFirstName}, we foster relationships that lead to successful hiring outcomes.
          </p>
          <br />
          <p>
          We work exclusively on a contingent basis and tailor our efforts to meet your needs. Feel free to reach out directly or {' '}
            <Link
              href="https://thecodercollective.com/hiring-manager"
              className="text-green underline"
              target="_blank"
            >
              visit our website
            </Link>{' '}
            and schedule time to discuss your hiring objectives.
          </p>
          <br />
          <p>
            Full disclosure, {userFirstName} receives a referral bonus if {emailCompany}{' '}
            ends up hiring someone through our services.
          </p>
          <br />
          <p>Best regards,</p>
          <br />
          <p>Andrew Schuessler</p>
          <p>Coder Collective</p>
          <p>
            847-609-4515 | Connect w/ me on{' '}
            <Link
              href="https://www.linkedin.com/in/andrew-schuessler-18965559/"
              className="text-green underline"
              target="_blank"
            >
              LinkedIn
            </Link>
          </p>
          <p>andrew@thecodercollective.com</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailMessage;
