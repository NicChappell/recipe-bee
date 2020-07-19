// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
    return (
        <div className="card-panel">
            <h3>Privacy Policy</h3>

            <p>This Privacy Policy document contains types of information that is collected and recorded by RecipeBee and how we use it. <Link to="/contact">Contact us</Link> if you have questions about our Privacy Policy.</p>

            <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they share with RecipeBee. This Privacy Policy does not apply to any information collected offline.</p>

            <h5>Consent</h5>

            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

            <h5>Information we collect</h5>

            <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
            <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
            <p>When you register for an Account, we may ask for your contact information, including items such as name, address, email and phone number.</p>

            <h5>How we use your information</h5>

            <p>We use the information we collect in various ways, including to:</p>

            <ul>
                <li>Provide, operate, and maintain our webste</li>
                <li>Improve, personalize, and expand our webste</li>
                <li>Understand and analyze how you use our webste</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the webste, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
            </ul>

            <h5>Activity Tracking</h5>

            <p>RecipeBee follows a standard procedure of tracking website activity. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

            <h5>Third Party Privacy Policies</h5>

            <p>RecipeBee's Privacy Policy does not apply to other advertisers or websites. Consult the respective Privacy Policies of any third-parties.</p>

            <h5>CCPA Privacy Rights</h5>

            <p>Under the CCPA, among other rights, California consumers have the right to:</p>
            <ul>
                <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
            </ul>

            <p>If you make a request, we have one month to respond to you. <Link to="/contact">Contact us</Link> to exercise any of these rights.</p>

            <h5>GDPR Data Protection Rights</h5>

            <p>Every user is entitled to the following:</p>
            <ul>
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data.</li>
                <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data.</li>
                <li>The right to object to processing – You have the right to object to our processing of your personal data.</li>
                <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
            </ul>

            <h5>Children's Information</h5>

            <p>RecipeBee does not knowingly collect any Personal Identifiable Information from children under the age of 13. <Link to="/contact">Contact us</Link> immediately if you believe your child has provided this type of information and we will remove it from our records.</p>
        </div>
    )
}

export default PrivacyPolicy
