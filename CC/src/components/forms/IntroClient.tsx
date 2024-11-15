

// 'use client';
// import { useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/components/ui/use-toast';
// import Loader from '../Loader';
// import { Button } from '../ui/button';
// import EmailMessage from '../EmailMessage';
// import { clientReferralEmailMessage } from '@/lib/utils';

// const IntroClientForm = ({ user }: { user: any }) => {
//   // States for email form fields
//   const router = useRouter();
//   const { toast } = useToast();
//   const [emailFirstName, setEmailFirstName] = useState('');
//   const [emailLastName, setEmailLastName] = useState('');
//   const [emailCompany, setEmailCompany] = useState('');
//   const [emailAddress, setEmailAddress] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const emailMessage = useMemo(() => {
//     return clientReferralEmailMessage({
//       emailFirstName,
//       userFirstName: user.firstName,
//       userLastName: user.lastName,
//       emailCompany,
//     });
//   }, [emailFirstName, emailLastName, emailCompany]);

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (!emailFirstName || !emailLastName || !emailAddress || !emailCompany) {
//       toast({ variant: 'destructive', title: 'Please complete all fields.' });
//       return;
//     }

//     try {
//       // Prepare form data
//       const formData = {
//         firstName: emailFirstName,
//         lastName: emailLastName,
//         company: emailCompany,
//         email: emailAddress,
//         introducedBy: user?._id,
//         message: emailMessage,
//       };

//       // Send a POST request to API to send the introduction email
//       const response = await fetch('/api/clientreferral', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         toast({ title: 'Client introduction created successfully' });
//         router.push('/thanks');
//       } else {
//         toast({ variant: 'destructive', title: 'Failed to send the email.' });
//       }
//     } catch (error) {
//       console.error(error);
//       toast({ variant: 'destructive', title: 'Something went wrong' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className='flex flex-col items-center min-h-screen bg-slate-100 px-4 py-10'>
//       <div className='w-full max-w-lg bg-white rounded-lg shadow-lg p-6 md:p-8'>
//         <div className='text-center'>
//           <h1 className='text-2xl md:text-3xl font-bold text-green'>
//             Introduce Us to a Hiring Manager
//           </h1>
//           <p className='text-sm md:text-base text-gray-600 mt-4'>
//             If this introduction leads to a successful placement via Coder Collective, you will be rewarded a referral fee of at least $6,000.
//           </p>
//         </div>
//         <div className='mt-6'>
//           <h2 className='text-lg md:text-xl mb-4 font-semibold text-green'>
//             Intro via Email
//           </h2>
//           <form onSubmit={handleSubmit} className='space-y-6'>
//             <div className='mb-4'>
//               <label className='block text-gray-700' htmlFor='firstName'>
//                 First Name
//               </label>
//               <input
//                 type='text'
//                 id='firstName'
//                 className='w-full px-4 py-2 border rounded-md bg-slate-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green'
//                 value={emailFirstName}
//                 onChange={(e) => setEmailFirstName(e.target.value)}
//               />
//             </div>
//             <div className='mb-4'>
//               <label className='block text-gray-700' htmlFor='lastName'>
//                 Last Name
//               </label>
//               <input
//                 type='text'
//                 id='lastName'
//                 className='w-full px-4 py-2 border rounded-md bg-slate-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green'
//                 value={emailLastName}
//                 onChange={(e) => setEmailLastName(e.target.value)}
//               />
//             </div>
//             <div className='mb-4'>
//               <label className='block text-gray-700' htmlFor='company'>
//                 Company
//               </label>
//               <input
//                 type='text'
//                 id='company'
//                 className='w-full px-4 py-2 border rounded-md bg-slate-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green'
//                 value={emailCompany}
//                 onChange={(e) => setEmailCompany(e.target.value)}
//               />
//             </div>
//             <div className='mb-4'>
//               <label className='block text-gray-700' htmlFor='email'>
//                 Email
//               </label>
//               <input
//                 type='email'
//                 id='email'
//                 className='w-full px-4 py-2 border rounded-md bg-slate-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green'
//                 value={emailAddress}
//                 onChange={(e) => setEmailAddress(e.target.value)}
//               />
//             </div>
//             <Button
//               type='submit'
//               size='lg'
//               className='w-full bg-green hover:bg-green/80 flex items-center gap-4 relative'
//               disabled={isLoading}
//             >
//               {isLoading && <Loader isSmall />}
//               <span>
//                 {isLoading
//                   ? 'Sending...'
//                   : 'Submit - We will CC you on the Email'}
//               </span>
//             </Button>
//           </form>
//           <EmailMessage
//             emailFirstName={emailFirstName}
//             userFirstName={user.firstName}
//             userLastName={user.lastName}
//             emailCompany={emailCompany}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IntroClientForm;


'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import Loader from '../Loader';
import { Button } from '../ui/button';
import EmailMessage from '../EmailMessage';
import { clientReferralEmailMessage } from '@/lib/utils';
import { Building2, DollarSign, Handshake, ArrowRight, Mail } from 'lucide-react';

const IntroClientForm = ({ user }: { user: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [emailFirstName, setEmailFirstName] = useState('');
  const [emailLastName, setEmailLastName] = useState('');
  const [emailCompany, setEmailCompany] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailMessage = useMemo(() => {
    return clientReferralEmailMessage({
      emailFirstName,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      emailCompany,
    });
  }, [emailFirstName, emailLastName, emailCompany]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (!emailFirstName || !emailLastName || !emailAddress || !emailCompany) {
      toast({ variant: 'destructive', title: 'Please complete all fields.' });
      setIsLoading(false);
      return;
    }

    try {
      const formData = {
        firstName: emailFirstName,
        lastName: emailLastName,
        company: emailCompany,
        email: emailAddress,
        introducedBy: user?._id,
        message: emailMessage,
      };

      const response = await fetch('/api/clientreferral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: 'Introduction submitted successfully! 🎉' });
        router.push('/thanks');
      } else {
        toast({ variant: 'destructive', title: 'Failed to send the introduction.' });
      }
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 mt-10">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Us with Hiring Managers
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Help companies find exceptional tech talent while earning significant rewards
          </p>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-green p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Earn $6,000+</h3>
              <p className="text-gray-200">For each successful placement through your introduction</p>
            </div>

            <div className="bg-green p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Building2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Help Companies Grow</h3>
              <p className="text-gray-200">Connect them with top tech talent</p>
            </div>

            <div className="bg-green p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Handshake className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Build Relationships</h3>
              <p className="text-gray-200">Strengthen your professional network</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Introduce via Email
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium" htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  value={emailFirstName}
                  onChange={(e) => setEmailFirstName(e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium" htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  value={emailLastName}
                  onChange={(e) => setEmailLastName(e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium" htmlFor="company">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                value={emailCompany}
                onChange={(e) => setEmailCompany(e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium" htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto px-8 py-4 bg-green text-white hover:bg-green-700 focus:ring-4 focus:ring-green-500/50 transition-all text-lg font-medium rounded-lg flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader isSmall />
                    <span className="ml-2">Sending Introduction...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Introduction</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg text-green font-semibold mb-4">Preview Email Message</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <EmailMessage
                emailFirstName={emailFirstName}
                userFirstName={user.firstName}
                userLastName={user.lastName}
                emailCompany={emailCompany}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroClientForm;
