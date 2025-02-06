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
          Hi {emailFirstName},  
        </p>  
        <br />
        <p>  
          {userFirstName} {userLastName} (CC&apos;d) recently shared your contact information and suggested we connect regarding potential hiring needs.  
        </p>  
          <br />
          <p>
          Coder Collective is a San Francisco-based recruitment firm specializing in direct hire placements for top-tier software engineers. 
          </p>
          <br />
          <p>
          We operate exclusively on a contingent basis, ensuring a tailored approach to meet your hiring goals. If you&apos;re interested in learning more, feel free to reach out directly or {''} 
          <Link
              href="https://thecodercollective.com/hiring-manager"
              className="text-green underline"
              target="_blank"
            >
              visit our website
            </Link>{' '}
            to schedule a time to discuss your hiring needs.  
          </p>
          <br />
          <p>
            Full disclosure, {userFirstName} receives a small referral bonus if {emailCompany}{' '}
            ends up hiring someone through our services.
          </p>
          <br />
          <p>Best regards,</p>
          <br />
          <p>Andrew Schuessler</p>
          <p>Managing Partner, Coder Collective</p>
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
