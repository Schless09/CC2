import Link from 'next/link';
import React from 'react';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white text-black shadow-lg rounded-lg p-4 my-16">
            <h1 className="text-3xl font-semibold text-center text-gray-500 mb-4">Terms and Conditions</h1>
            <p className="text-sm text-right text-gray-500 mb-6">Last Updated: October 4th, 2024</p>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">1. Introduction</h2>
            <p className="mb-4">Welcome to the Referral and Reward Program (the “Program”) of Coder Collective (“Company”, “we”, “our”). These terms and conditions govern your participation in the Program. By participating, you agree to these terms.</p>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">2. Eligibility</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Participants must be aged 18 or over.</li>
                <li>Employees of the Company and their immediate family members are not eligible for the Program.</li>
                <li>Compliance with all applicable laws and regulations is mandatory.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">3. Referral Eligibility</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Referred candidates and clients must be new contacts and not previously known or engaged with the Company within the last 180 days.</li>
                <li>Referrals must be submitted through the specified channels provided by the Company.</li>
                <li>Unfortunately, User may not submit themselves as a referral.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">4. Rewards</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Rewards are subject to successful placements as defined in the FAQ section.</li>
                <li>The Company reserves the right to change the reward structure at any time.</li>
                <li>Rewards are non-transferable and cannot be exchanged for cash or other alternatives.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">5. Payment of Rewards</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Rewards are processed following the completion of the “90 Day Placement Guarantee” period.</li>
                <li>Participants are responsible for any taxes or charges associated with the reward.</li>
                <li>Participants must provide accurate payment information and complete necessary tax documentation.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">6. Limitation of Liability</h2>
            <ul className="list-disc list-inside mb-4">
                <li>The Company is not responsible for incorrect or incomplete referral information.</li>
                <li>The Company is not liable for any losses or damages arising from participation in the Program.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">7. Privacy</h2>
            <p className="mb-4">
                Personal information collected will be used in accordance with the Company’s 
                <Link href="/legal/privacy">
                    <span className="text-blue-600 hover:text-blue-800"> Privacy Policy</span>
                </Link>.
            </p>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">8. Program Modification and Termination</h2>
            <p className="mb-4">The Company reserves the right to modify or terminate the Program at any time without prior notice.</p>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">9. Disputes</h2>
            <p className="mb-4">Any disputes arising under these terms will be resolved in accordance with the governing law of Delaware.</p>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">10. Contact Information</h2>
            <p className="mb-4">For questions or concerns regarding the Program or these Terms and Conditions, please contact us at referrals@thecodercollective.com.</p>

            <h2 className="text-2xl font-semibold text-gray-500 mt-6 mb-2">11. Acknowledgment</h2>
            <p className="mb-4">By participating in the Program, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
        </div>
    );
};

export default Terms;


