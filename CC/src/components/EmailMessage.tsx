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
            Hi {emailFirstName} - this message is being sent to you on behalf of{' '}
            {userFirstName} {userLastName} (CC&apos;d). We noticed{' '}
            {emailCompany ?? 'your team'} is hiring software enginnering talent
            and asked {userFirstName} to make the introduction.
          </p>
          <br />
          <p>
            At our core, Coder Collective is a recruitment firm. 
            What makes us unique is our ability to harness the potential of expansive networks. 
            Our approach empowers the everyday Accountant to utilize their personal and professional networks, aiding us in forging meaningful relationships.
          </p>
          <br />
          <p>
            Specializing in the direct hire placement of top-tier SWE
            professionals, we&apos;d welcome the opportunity to not only meet, but exceed
            your hiring requirements.
          </p>
          <br />
          <p>
            Full disclosure, {userFirstName} receives a referral bonus if you
            end up hiring someone through our services.
          </p>
          <br />
          <p>
           We exclusively conduct contingent searches, ensuring our services are tailored to meet your specific needs. To get started, please feel free to reach out directly or {' '}
            <Link
              href="https://thecodercollective.com/hiring-manager"
              className="text-magenta underline"
              target="_blank"
            >
              visit our website
            </Link>{' '}
            and schedule time to discuss your hiring objectives.
          </p>
          <br />
          <p>Best regards,</p>
          <br />
          <p>Andrew Schuessler</p> <p>Coder Collective</p>
          <p>
            847-609-4515 | Connect w/ me on{' '}
            <Link
              href="https://www.linkedin.com/in/andrew-schuessler-18965559/"
              className="text-magenta underline"
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
