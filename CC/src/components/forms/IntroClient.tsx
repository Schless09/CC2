'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import Loader from '../Loader';
import { Button } from '../ui/button';
import EmailMessage from '../EmailMessage';
import { clientReferralEmailMessage } from '@/lib/utils';
import { Building2, DollarSign, Mail, ArrowRight } from 'lucide-react';

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
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-gray-900 via-green to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Connect Us with Hiring Managers
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto"> 
              Help companies find exceptional tech talent while earning significant rewards
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Earn $6,000+</h3>
              <p className="text-gray-600">For each successful placement through your introduction</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Help Companies Grow</h3>   
              <p className="text-gray-600">Connect them with top tech talent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-2">
              <Mail className="w-6 h-6 text-green" />
              <span>Introduce via Email</span>   
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                    type="text"
                    id="firstName"  
                    value={emailFirstName}
                    onChange={(e) => setEmailFirstName(e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>  
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                    type="text"
                    id="lastName"
                    value={emailLastName} 
                    onChange={(e) => setEmailLastName(e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green focus:border-transparent transition-colors"  
                  type="email"
                  id="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter email address" 
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="company">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green focus:border-transparent transition-colors"
                  type="text" 
                  id="company"
                  value={emailCompany}
                  onChange={(e) => setEmailCompany(e.target.value)}  
                  placeholder="Enter company name"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green hover:bg-green/90 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader isSmall />   
                    <span>Sending Introduction...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Introduction</span>
                    <ArrowRight className="w-5 h-5" />
                  </>  
                )}
              </Button>
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
    </div>
  );
};

export default IntroClientForm;