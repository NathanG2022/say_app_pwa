import React from 'react';
// import { verify } from '../../actions/auth';
import Input from '../Auth/Input';

const TermsOfServicePage = ({ handleAccept }) => {
    return (
        <div>
            <h2>Terms of Service - N-Connect</h2>
            <p>Welcome to N-Connect, a social media app designed to foster a supportive and inclusive community for neurodivergent individuals. By using N-Connect, you agree to be bound by the following Terms of Service. Please read them carefully.</p>
            <p>Acceptance of Terms</p>
            <p>By accessing or using N-Connect, you agree to these Terms of Service and any additional terms and conditions that may apply to specific features of the app. If you do not agree with any part of these terms, you may not use the app.</p>
            <p>User Responsibilities</p>
            <ul>
                <li>a. Eligibility: You must be at least 13 years old to use N-Connect. If you are under 18, you must have parental consent to use the app.</li>
                <li>b. Account Security: You are responsible for maintaining the confidentiality of your account credentials and for any activity that occurs under your account.</li>
                <li>c. Content Responsibility: You are solely responsible for the content you post or share on N-Connect. You agree not to post any content that is unlawful, harmful, defamatory, obscene, or infringes on any third-party rights.</li>
                <li>d. Respectful Behavior: N-Connect promotes a safe and inclusive environment. You agree to treat all users with respect, refrain from harassment, discrimination, or any other form of harmful behavior.</li>
            </ul>
            <p>Intellectual Property</p>
            <ul>
                <li>a. Ownership: N-Connect and its associated features, including but not limited to logos, trademarks, and content, are the exclusive property of the app's producers.</li>
                <li>b. License: By posting or sharing content on N-Connect, you grant the app's producers a non-exclusive, royalty-free, worldwide license to use, modify, reproduce, and distribute your content for the purpose of operating and improving the app.</li>
            </ul>
            <p>Limitation of Liability</p>
            <ul>
                <li>a. No Warranty: N-Connect is provided on an "as-is" and "as available" basis. The app's producers make no warranties, whether expressed or implied, regarding the app's functionality, accuracy, or reliability.</li>
                <li>b. User Discretion: You acknowledge that your use of N-Connect is at your sole discretion and risk. The app's producers shall not be liable for any damages, whether direct, indirect, incidental, or consequential, arising from your use of the app.</li>
                <li>c. Indemnification: You agree to indemnify and hold harmless the app's producers, their affiliates, and their respective directors, officers, employees, and agents from any claims, losses, liabilities, damages, or expenses arising out of your use of N-Connect or violation of these Terms of Service.</li>
            </ul>
            <p>Modification and Termination</p>
            <ul>
                <li>a. Modification: The app's producers reserve the right to modify or update these Terms of Service at any time. Any changes will be effective immediately upon posting.</li>
                <li>b. Termination: The app's producers may, at their sole discretion, terminate or suspend your access to N-Connect, with or without cause and without prior notice.</li>
            </ul>
            <p>Governing Law and Dispute Resolution</p>
            <ul>
                <li>a. Governing Law: These Terms of Service shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of laws principles.</li>
                <li>b. Dispute Resolution: Any disputes arising from these Terms of Service shall be resolved through binding arbitration conducted by a neutral arbitrator in [Jurisdiction]. You waive your right to participate in any class action lawsuit against the app's producers.</li>
            </ul>
            <p>Severability</p>
            <p>If any provision of these Terms of Service is deemed invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
            <p>By using N-Connect, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
            <form>
                <Input name="email" label="Email Address" type="email" />
                <button onClick={handleAccept}>Accept</button>
            </form>
        </div>
    );
};

export default TermsOfServicePage;