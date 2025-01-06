

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const FAQs = () => {
    return (
        <div className="max-w-4xl mx-auto text-gray-800 shadow-md rounded-lg p-6 my-20">
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
                Frequently Asked Questions (FAQ) - Referral and Reward Program
            </h1>

            <div className="">
                {faqItems.map((faq, index) => (
                    <Accordion key={index} className="mb-4 rounded-lg shadow-sm">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="text-gray-600" />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            className="bg-white hover:bg-gray-700 rounded-t-lg"
                        >
                            <p className="text-lg font-medium">{faq.question}</p>
                        </AccordionSummary>
                        <AccordionDetails className="bg-white text-black p-4 rounded-b-lg">
                            {faq.answer}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

const faqItems = [
    {
        question: "What is the Referral and Reward Program?",
        answer: (
            <p>
                At Coder Collective, our program rewards users who refer candidates and/or clients to our platform, contributing to successful placements. It&apos;s our gratitude for connecting great talent with opportunities.
            </p>
        ),
    },
    {
        question: "Validity Period of Referrals",
        answer: (
            <p>
                Referred candidates and clients remain eligible for placements and rewards for a period of 180 days from their last documented status update.
            </p>
        ),
    },
    {
        question: "Exclusion Criteria for Candidates Referral Rewards",
        answer: (
            <p>
                Known candidates who have been active within the last 180 days in our system are not eligible for referral rewards.
            </p>
        ),
    },
    {
        question: "Exclusion Criteria for Client Introductions Rewards",
        answer: (
            <p>
                Clients who have engaged with us on a contingent search within the last 180 days are not eligible for referral rewards.
            </p>
        ),
    },
    {
        question: "Rewards for Candidate Referrals",
        answer: (
            <ul className="list-disc pl-6">
                <li>First Successful Referral: $6,000</li>
                <li>Second Successful Referral: $9,000</li>
                <li>Third or More: $12,000</li>
            </ul>
        ),
    },
    {
        question: "Rewards for Client Introductions",
        answer: (
            <ul className="list-disc pl-6">
                <li>First Successful Introduction: $6,000</li>
                <li>Second Successful Introduction: $9,000</li>
                <li>Third or More: $12,000</li>
            </ul>
        ),
    },
    {
        question: "Definition of a Successful Placement",
        answer: (
            <p>
                A successful placement for candidates occurs when a referred candidate is hired and stays in the role through our “90 Day Placement Guarantee.” For clients, it&apos;s when a client hires a candidate you introduced, under the same guarantee.
            </p>
        ),
    },
    {
        question: "Notification of Earned Rewards",
        answer: (
            <p>
                You&apos;ll receive an email or dashboard notification when your referral or introduction leads to a successful placement.
            </p>
        ),
    },
    {
        question: "Referring Both Candidates and Clients",
        answer: (
            <p>
                You are encouraged to refer both candidates and clients, with rewards applicable for each successful referral.
            </p>
        ),
    },
    {
        question: "No Limit on Referrals",
        answer: (
            <p>
                There&apos;s no cap on the number of referrals you can make annually. The more quality referrals, the more rewards.
            </p>
        ),
    },
    {
        question: "Limit on Rewards",
        answer: (
            <p>
                You are only eligible for one client referral reward per client. For example, if you refer a client and they hire 3 candidates, you will only receive the client referral reward once.<br /><br />
                For a reward to be earned via client introduction, the client must offer a minimum base salary of at least $90,000.
            </p>
        ),
    },
    {
        question: "Tracking Referrals and Rewards",
        answer: (
            <p>
                Monitor your referral success and earnings through your dashboard, which displays your active referrals and total yearly earnings.
            </p>
        ),
    },
    {
        question: "No Self-Referral for Rewards",
        answer: (
            <p>
                Self-referrals are not eligible. If seeking opportunities, consider being referred by a friend or family member.
            </p>
        ),
    },
    {
        question: "When Will You Receive Reward Payment?",
        answer: (
            <p>
                Rewards are processed at the month&apos;s end following the completion of the “90 Day Placement Guarantee” period. You&apos;ll receive payments via your preferred method and a Form 1099-NEC for tax purposes.
            </p>
        ),
    },
    {
        question: "What Happens if the Candidate is Terminated?",
        answer: (
            <p>
                If there is a falloff, meaning the candidate&apos;s position is terminated for any reason during the "90 Day Placement Guarantee" period, you will no longer be eligible for the referral reward.
            </p>
        ),
    },
    {
        question: "Setting Up Payment Methods",
        answer: (
            <p>
                When eligible, you can set or update your preferred payment method through your account settings. Ensure it&apos;s up-to-date for seamless reward processing.
            </p>
        ),
    },
    {
        question: "Further Questions?",
        answer: (
            <p>
                If you have any more questions or need clarification, feel free to reach out to our team at referrals@thecodercollective.com. We&apos;re here to help!
            </p>
        ),
    },
];

export default FAQs;

