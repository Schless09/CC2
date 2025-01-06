'use client'
import PieCharts from '@/components/PieCart';
import Link from 'next/link';

export default function BusinessModel() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="w-full bg-gradient-to-br from-gray-900 via-green to-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                            The Top Side-Hustle for Software Engineers
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                            At Coder Collective, we've revolutionized the recruitment process, providing software engineers & tech talent with a unique opportunity to boost their income through referrals.
                        </p>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                            Earn <span className="font-bold text-white">$6,000</span> for your first successful referral, <span className="font-bold text-white">$9,000</span> for your second, and <span className="font-bold text-white">$12,000</span> for your third and any additional referrals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section className="w-full bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="flex justify-center">
                            <img 
                                src="images/referafriend.jpg"
                                alt="Refer a friend illustration"
                                className="w-full max-w-md rounded-xl shadow-2xl" 
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Just Make the Intro
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed space-y-4">
                                Our referral program is simple and lucrative. Refer 
                                <Link href="/referrals">
                                    <span className="text-green hover:text-green/80 transition-colors"> candidates</span>
                                </Link> or 
                                <Link href="/introClient">
                                    <span className="text-green hover:text-green/80 transition-colors"> clients</span>
                                </Link>, and let our team of recruiters do the heavy lifting.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mt-4">
                                Track all your referrals and earnings through your personal
                                <Link href="/dashboard">
                                    <span className="text-green hover:text-green/80 transition-colors"> dashboard</span>
                                </Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chart Section */}
            <section className="w-full bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How the Rewards Add Up
                        </h2>
                        <p className="text-lg text-gray-600">
                            (using $20,000 fee to show easy math)
                        </p>
                    </div>
                    <PieCharts />
                </div>
            </section>

            {/* Call to Action */}
            <section className="w-full bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                            Start Earning Today
                        </h2>
                        <p className="text-xl text-gray-700 mb-12">
                            Simply make the introductions, and let the team at Coder Collective handle the rest. Whether you're referring a talented candidate or introducing a new client, your referrals help grow our community and boost your wallet.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                            <Link href="/referrals">
                                <span className="inline-block bg-green hover:bg-green/90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:-translate-y-1">
                                    Refer Candidates
                                </span>
                            </Link>
                            <Link href="/introClient">
                                <span className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:-translate-y-1">
                                    Introduce Clients
                                </span>
                            </Link>
                        </div>

                        <div>
                            <p className="text-gray-700 mb-3">Still have questions?</p>
                            <Link href="/learn-more">
                                <span className="text-green hover:text-green/80 underline transition-colors">
                                    Schedule time to learn more about our business model
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}