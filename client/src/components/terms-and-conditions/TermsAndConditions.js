// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'

const TermsAndConditions = () => {
    return (
        <div className="card-panel">
            <h3>Terms and Conditions</h3>

            <p>By using the RecipeBee application we assume you accept these terms and conditions. Do not continue to use this application if you do not agree to all of the terms and conditions stated on this page.</p>

            <p>The following terminology applies to these terms and conditions and all agreements: "Client", "You" and "Your" refers to you, the person using this application and compliant to the Company’s terms and conditions. "Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

            <h5>License</h5>

            <p>Unless otherwise stated, RecipeBee, LLC and/or its licensors own the intellectual property rights for all material on RecipeBee. All intellectual property rights are reserved. You may access this from RecipeBee for your own personal use subjected to restrictions set in these terms and conditions.</p>

            <p>You must not:</p>
            <ul>
                <li>Republish material from RecipeBee</li>
                <li>Sell, rent or sub-license material from RecipeBee</li>
                <li>Reproduce, duplicate or copy material from RecipeBee</li>
                <li>Redistribute content from RecipeBee</li>
            </ul>

            <h5>User-Generated Content</h5>

            <p>Parts of this application offer an opportunity for users to post content. RecipeBee, LLC does not filter, edit, publish or review content prior to its presence on the application. User-generated content (UGC) does not reflect the views and opinions of RecipeBee, LLC,its agents and/or affiliates. UGC reflects the views and opinions of the person who posted it. To the extent permitted by applicable laws, RecipeBee, LLC shall not be liable for the UGC or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the UGC on this application.</p>

            <p>RecipeBee, LLC reserves the right to monitor all UGC and to remove any UGC which can be considered inappropriate, offensive or causes breach of these terms and conditions.</p>

            <p>You warrant and represent that:</p>

            <ul>
                <li>You are entitled to post UGC on our application and have all necessary licenses and consents to do so;</li>
                <li>The UGC does not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                <li>The UGC does not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                <li>The UGC will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
            </ul>

            <p>You hereby grant RecipeBee, LLC a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your UGC in any and all forms, formats or media.</p>

            <h5>Your Privacy</h5>

            <p>Please read our <Link to="/privacy-policy">Privacy Policy</Link></p>

            <h5>Disclaimer</h5>

            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our application and the use of this application. Nothing in this disclaimer will:</p>

            <ul>
                <li>limit or exclude our or your liability for death or personal injury;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>

            <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

            <p>As long as the application and the information and services on the application are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
        </div>
    )
}

export default TermsAndConditions
