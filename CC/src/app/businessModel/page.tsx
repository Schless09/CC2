'use client'
import PieCharts from '@/components/PieCart';
import Head from 'next/head';
import Link from 'next/link';

export default function BusinessModel() {
    return (
        <div className="container mx-auto px-6 py-8 bg-gray-50 text-gray-900">
            <Head>
                <title>Top Side-Hustle for Software Engineers | Coder Collective</title>
                <meta name="description" content="Discover how SWE professionals can boost income with the Coder Collective' referral model." />
            </Head>

          
            <section className="text-center my-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-8">
                The Top Side-Hustle for Software Engineers
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
                At Coder Collective, we’ve revolutionized the recruitment process, providing software engineers & tech talent with a unique opportunity to boost their income through referrals. 
                
            </p>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
                We prioritize rewarding your efforts. Earn <span className="font-bold text-magenta">$6,000</span> for your first successful referral, <span className="font-bold text-magenta">$9,000</span> for your second, and <span className="font-bold text-magenta">$12,000</span> for your third and any additional referrals. 
                Start maximizing your income today—your network can be your greatest asset!
            </p>
        </section>
        
        {/* Key Value Proposition Section */}
            <section className="bg-white py-16 mb-16"> {/* Set the background to white and add padding */}
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Column */}
                    <div className="flex justify-center mb-4 md:mb-0">
                        <img 
                            src="images/referafriend.jpg"
                            alt="Description of the image"
                            className="w-96 h-96 md:w-80 md:h-80 rounded-lg " 
                        />
                    </div>

                    {/* Text Column */}
                    <div className="flex flex-col items-start text-left p-6">
                        <h2 className="text-4xl font-bold mb-6">Just Make the Intro</h2>
                        <p className="text-lg text-gray-700 leading-relaxed max-w-lg mb-4">
                            Our referral program is simple and lucrative. Refer  
                            <Link href="/referrals">
                                <span className="text-magenta hover:text-yorange cursor-pointer"> candidates</span>
                            </Link> or  
                            <Link href="/introClient">
                                <span className="text-magenta hover:text-yorange cursor-pointer"> clients</span>
                            </Link>, and let our team of recruiters do the heavy lifting. 
                            <br />
                            <br />
                            Track all your referrals and earnings through your personal 
                            <Link href="/dashboard">
                                <span className="text-magenta hover:text-yorange cursor-pointer"> dashboard</span>
                            </Link>.
                        </p>
                    </div>
                </div>
            </section>



            {/* Chart Section */}
            <section className="bg-slate-100 py-16"> {/* Increased py-12 to py-16 for more vertical space */}
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">How the Rewards Add Up</h2>
                    <p className="text-lg text-gray-600 mb-6">(using $20,000 fee to show easy math)</p> {/* Increased mb-4 to mb-6 */}
                    <PieCharts /> {/* Updated PieCharts component */}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 text-center"> {/* Increased py-12 to py-16 for more vertical space */}
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Start Earning Today</h2>
                <p className="text-2xl text-gray-700 mb-10"> {/* Increased mb-8 to mb-10 */}
                    Simply make the introductions, and let the team at Coder Collective handle the rest. Whether you're referring a talented candidate or introducing a new client, your referrals help grow our community and boost your wallet.
                </p>


                <div className="flex justify-center space-x-4 mb-8">
                    <Link href="/referrals">
                        <span className="bg-magenta text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-magenta/80 transition-colors shadow-md transform hover:scale-105">
                            Refer Candidates
                        </span>
                    </Link>
                    <Link href="/introClient">
                        <span className="bg-gray-800 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors shadow-md transform hover:scale-105">
                            Introduce Clients
                        </span>
                    </Link>
                </div>

                <div className="mt-8">
                    <p className="text-gray-700 mb-2">Still have questions?</p> {/* Added mb-2 for spacing */}
                    <Link href="/learn-more">
                        <span className="text-magenta hover:text-magenta/80 underline cursor-pointer">Schedule time to learn more about our business model</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
