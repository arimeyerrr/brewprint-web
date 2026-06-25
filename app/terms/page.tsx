import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Brewprint',
  description: 'The terms governing your use of the Brewprint app and website.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
        <p className="text-[10px] tracking-[0.35em] uppercase font-medium mb-4" style={{ color: 'rgba(217,142,74,0.55)' }}>
          legal
        </p>
        <h1 className="text-white font-bold mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
          Terms and Conditions
        </h1>
        <p className="text-white/30 text-sm mb-12">Last updated: May 24, 2026</p>

        <div className="prose-brewprint">

          <p>
            We are Onebrew LLC, doing business as Brewprint (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), a company registered in Florida, United States at 1305 NW 5th Avenue, Lady Lake, FL 32603.
          </p>
          <p>
            We operate the mobile application Brewprint (the &quot;App&quot;), as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
          </p>
          <p>
            Brewprint is a dual-sided mobile application that connects consumers with independent coffee shops through a proprietary preference-matching algorithm. Consumers discover, review, and save local coffee shops. Coffee shop owners access a business dashboard with analytics, marketing tools, and subscription-based features.
          </p>
          <p>
            You can contact us by phone at (954) 289-7411, email at <a href="mailto:ari@brewprintapp.com">ari@brewprintapp.com</a>, or by mail to 1305 NW 5th Avenue, Lady Lake, FL 32603, United States.
          </p>
          <p>
            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and Onebrew LLC, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
          </p>
          <p>
            We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by email, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
          </p>
          <p>
            The Services are intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.
          </p>

          <nav className="my-8 p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: 'rgba(217,142,74,0.55)' }}>Table of Contents</p>
            <ol className="toc-list">
              {toc.map((item, i) => (
                <li key={i}><a href={`#section-${i + 1}`}>{item}</a></li>
              ))}
            </ol>
          </nav>

          <Section id="section-1" title="1. Our Services">
            <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>
            <p>The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).</p>
          </Section>

          <Section id="section-2" title="2. Intellectual Property Rights">
            <h3>Our intellectual property</h3>
            <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).</p>
            <p>Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.</p>
            <p>The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use or internal business purpose only.</p>

            <h3>Your use of our Services</h3>
            <p>Subject to your compliance with these Legal Terms, including the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to access the Services and download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.</p>
            <p>Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
            <p>If you wish to make any use of the Services, Content, or Marks other than as set out in this section, please address your request to: <a href="mailto:ari@brewprintapp.com">ari@brewprintapp.com</a>. We reserve all rights not expressly granted to you in and to the Services, Content, and Marks. Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.</p>

            <h3>Your submissions and contributions</h3>
            <p><strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (&quot;Submissions&quot;), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.</p>
            <p><strong>Contributions:</strong> The Services may invite you to create, submit, post, display, transmit, publish, or distribute content and materials to us or through the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, reviews, rating suggestions, or personal information (&quot;Contributions&quot;). Any Submission that is publicly posted shall also be treated as a Contribution.</p>
            <p><strong>When you post Contributions, you grant us a license:</strong> By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right and license to use, copy, reproduce, distribute, sell, publish, broadcast, store, publicly perform, publicly display, reformat, translate, excerpt, and exploit your Contributions for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, your Contributions, and to sublicense the licenses granted in this section.</p>
            <p><strong>You are responsible for what you post or upload:</strong> By posting Contributions, you confirm that you will not post anything that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening, sexually explicit, false, inaccurate, deceitful, or misleading; you waive any moral rights to such Contributions; you warrant that Contributions are original to you or that you have the necessary rights; and you warrant that Contributions do not constitute confidential information. You are solely responsible for your Contributions and expressly agree to reimburse us for any and all losses resulting from your breach of this section.</p>
            <p>Although we have no obligation to monitor any Contributions, we shall have the right to remove or edit any Contributions at any time without notice if we consider such Contributions harmful or in breach of these Legal Terms.</p>
          </Section>

          <Section id="section-3" title="3. User Representations">
            <p>By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity and agree to comply with these Legal Terms; (4) you are not under the age of 13; (5) you are not a minor in your jurisdiction, or if a minor, you have received parental permission; (6) you will not access the Services through automated or non-human means; (7) you will not use the Services for any illegal or unauthorized purpose; and (8) your use of the Services will not violate any applicable law or regulation.</p>
            <p>If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services.</p>
          </Section>

          <Section id="section-4" title="4. User Registration">
            <p>You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
          </Section>

          <Section id="section-5" title="5. Purchases and Payment">
            <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as required. We may change prices at any time. All payments shall be in US dollars.</p>
            <p>You authorize us to charge your chosen payment provider for any amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment. We reserve the right to refuse any order placed through the Services.</p>
          </Section>

          <Section id="section-6" title="6. Subscriptions">
            <h3>Billing and Renewal</h3>
            <p>Your subscription will continue and automatically renew unless canceled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel. The length of your billing cycle will depend on the type of subscription plan you choose.</p>

            <h3>Free Trial</h3>
            <p>We offer a 90-day free trial to new users who register with the Services. The account will be charged according to the user&apos;s chosen subscription at the end of the free trial.</p>

            <h3>Cancellation</h3>
            <p>All purchases are non-refundable. You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at <a href="mailto:ari@brewprintapp.com">ari@brewprintapp.com</a>.</p>

            <h3>Fee Changes</h3>
            <p>We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.</p>
          </Section>

          <Section id="section-7" title="7. Prohibited Activities">
            <p>You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:</p>
            <ul>
              <li>Systematically retrieve data or other content from the Services to create or compile a collection, compilation, database, or directory without written permission from us.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
              <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
              <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
              <li>Engage in unauthorized framing of or linking to the Services.</li>
              <li>Upload or transmit viruses, Trojan horses, or other material that interferes with any party&apos;s uninterrupted use and enjoyment of the Services.</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
              <li>Delete the copyright or other proprietary rights notice from any Content.</li>
              <li>Attempt to impersonate another user or person or use the username of another user.</li>
              <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
              <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
              <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services.</li>
              <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
              <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
              <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
              <li>Sell or otherwise transfer your profile.</li>
              <li>Use the Services to advertise or offer to sell goods and services.</li>
              <li>Post false, misleading, or fabricated coffee shop reviews.</li>
              <li>Scrape, copy, or reverse engineer the app&apos;s matching algorithm or data.</li>
            </ul>
          </Section>

          <Section id="section-8" title="8. User Generated Contributions">
            <p>The Services may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information (collectively, &quot;Contributions&quot;). Contributions may be viewable by other users of the Services and through third-party websites.</p>
            <p>When you create or make available any Contributions, you thereby represent and warrant that your Contributions: are original to you or that you have the necessary licenses; do not infringe the proprietary rights of any third party; are not false, inaccurate, or misleading; are not unsolicited advertising, spam, or chain letters; are not obscene, violent, harassing, libelous, or otherwise objectionable; do not violate the privacy or publicity rights of any third party; do not violate any applicable law, regulation, or rule; and do not violate any provision of these Legal Terms.</p>
          </Section>

          <Section id="section-9" title="9. Contribution License">
            <p>By posting your Contributions to any part of the Services, you automatically grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt, and distribute such Contributions for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing.</p>
            <p>We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions. You are solely responsible for your Contributions and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.</p>
          </Section>

          <Section id="section-10" title="10. Guidelines for Reviews">
            <p>We may provide you areas on the Services to leave reviews or ratings. When posting a review, you must comply with the following criteria: (1) you should have firsthand experience with the entity being reviewed; (2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hateful language; (3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability; (4) your reviews should not contain references to illegal activity; (5) you should not be affiliated with competitors if posting negative reviews; (6) you should not make any conclusions as to the legality of conduct; (7) you may not post any false or misleading statements; and (8) you may not organize a campaign encouraging others to post reviews, whether positive or negative.</p>
            <p>We may accept, reject, or remove reviews in our sole discretion. Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any of our affiliates or partners. We do not assume liability for any review or for any claims, liabilities, or losses resulting from any review.</p>
          </Section>

          <Section id="section-11" title="11. Mobile Application License">
            <h3>Use License</h3>
            <p>If you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on wireless electronic devices owned or controlled by you, and to access and use the App on such devices strictly in accordance with the terms and conditions of this mobile application license. You shall not: (1) except as permitted by applicable law, decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the App; (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the App; (3) violate any applicable laws, rules, or regulations in connection with your access or use of the App; (4) remove, alter, or obscure any proprietary notice posted by us or the licensors of the App; (5) use the App for any revenue-generating endeavor, commercial enterprise, or other purpose for which it is not designed or intended; (6) use the App to send automated queries to any website or to send any unsolicited commercial email; or (7) use any proprietary information or any of our interfaces or other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the App.</p>

            <h3>Apple and Android Devices</h3>
            <p>The following terms apply when you use the App obtained from either the Apple Store or Google Play (each an &quot;App Distributor&quot;): (1) the license granted to you for our App is limited to a non-transferable license to use the application on a device that utilizes the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor&apos;s terms of service; (2) we are responsible for providing any maintenance and support services with respect to the App as specified in these Legal Terms or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the App; (3) in the event of any failure of the App to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor may refund the purchase price, if any, paid for the App; (4) you represent and warrant that you are not located in a country that is subject to a US government embargo, or that has been designated by the US government as a &quot;terrorist supporting&quot; country, and you are not listed on any US government list of prohibited or restricted parties; and (5) you acknowledge and agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application license, and that each App Distributor will have the right to enforce the terms and conditions in this mobile application license against you as a third-party beneficiary thereof.</p>
          </Section>

          <Section id="section-12" title="12. Third-Party Websites and Content">
            <p>The Services may contain links to other websites (&quot;Third-Party Websites&quot;) as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties (&quot;Third-Party Content&quot;). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services.</p>
            <p>Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern.</p>
          </Section>

          <Section id="section-13" title="13. Advertisers">
            <p>We allow advertisers to display their advertisements and other information in certain areas of the Services, such as sidebar advertisements or banner advertisements. We simply provide the space to place such advertisements, and we have no other relationship with advertisers.</p>
          </Section>

          <Section id="section-14" title="14. Services Management">
            <p>We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</p>
          </Section>

          <Section id="section-15" title="15. Privacy Policy">
            <p>We care about data privacy and security. Please review our Privacy Policy: <a href="/privacy">brewprintapp.com/privacy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.</p>
            <p>We do not knowingly accept, request, or solicit information from children or knowingly market to children. In accordance with the U.S. Children&apos;s Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Services as quickly as is reasonably practical.</p>
          </Section>

          <Section id="section-16" title="16. Copyright Infringements">
            <p>We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a &quot;Notification&quot;). A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be held liable for damages if you make material misrepresentations in a Notification.</p>
          </Section>

          <Section id="section-17" title="17. Term and Termination">
            <p>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.</p>
            <p>If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p>
          </Section>

          <Section id="section-18" title="18. Modifications and Interruptions">
            <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services.</p>
          </Section>

          <Section id="section-19" title="19. Governing Law">
            <p>These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of Florida applicable to agreements made and to be entirely performed within the State of Florida, without regard to its conflict of law principles.</p>
          </Section>

          <Section id="section-20" title="20. Dispute Resolution">
            <h3>Informal Negotiations</h3>
            <p>To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a &quot;Dispute&quot;), the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.</p>

            <h3>Binding Arbitration</h3>
            <p>If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL. The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the American Arbitration Association (&quot;AAA&quot;) and, where appropriate, the AAA&apos;s Supplementary Procedures for Consumer Related Disputes (&quot;AAA Consumer Rules&quot;). Except where otherwise required by the applicable AAA rules or applicable law, the arbitration will take place in Alachua County, Florida.</p>
            <p>If for any reason, a Dispute proceeds in court rather than arbitration, the Dispute shall be commenced or prosecuted in the state and federal courts located in Florida, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction, and forum non conveniens with respect to venue and jurisdiction in such state and federal courts. In no event shall any Dispute related in any way to the Services be commenced more than one (1) year after the cause of action arose.</p>

            <h3>Restrictions</h3>
            <p>The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.</p>

            <h3>Exceptions to Informal Negotiations and Arbitration</h3>
            <p>The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations and binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief.</p>
          </Section>

          <Section id="section-21" title="21. Corrections">
            <p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>
          </Section>

          <Section id="section-22" title="22. Disclaimer">
            <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES.</p>
          </Section>

          <Section id="section-23" title="23. Limitations of Liability">
            <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.</p>
          </Section>

          <Section id="section-24" title="24. Indemnification">
            <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&apos; fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services.</p>
          </Section>

          <Section id="section-25" title="25. User Data">
            <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</p>
          </Section>

          <Section id="section-26" title="26. Electronic Communications, Transactions, and Signatures">
            <p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES.</p>
          </Section>

          <Section id="section-27" title="27. California Users and Residents">
            <p>If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.</p>
          </Section>

          <Section id="section-28" title="28. Miscellaneous">
            <p>These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services.</p>
          </Section>

          <Section id="section-29" title="29. Google Maps / Places">
            <p>By using Brewprint&apos;s map and discovery features, you agree to be bound by Google&apos;s Terms of Service (<a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">policies.google.com/terms</a>). Brewprint uses Google Maps Platform APIs to display coffee shop locations and information.</p>
          </Section>

          <Section id="section-30" title="30. Algorithmic Matching">
            <p>Brewprint&apos;s preference-matching algorithm generates compatibility scores between users and coffee shops based on user-selected taste preferences. These scores are for informational and discovery purposes only and do not constitute endorsements or guarantees. Brewprint makes no warranty regarding the accuracy of match scores.</p>
          </Section>

          <Section id="section-31" title="31. Contact Us">
            <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
            <div className="mt-4 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ margin: 0 }}><strong>Onebrew LLC</strong></p>
              <p style={{ margin: 0 }}>1305 NW 5th Avenue</p>
              <p style={{ margin: 0 }}>Lady Lake, FL 32603</p>
              <p style={{ margin: 0 }}>United States</p>
              <p style={{ margin: 0 }}>Phone: (954) 289-7411</p>
              <p style={{ margin: 0 }}><a href="mailto:ari@brewprintapp.com">ari@brewprintapp.com</a></p>
            </div>
          </Section>

        </div>
      </div>

      <style>{`
        .prose-brewprint p {
          color: rgba(255,255,255,0.55);
          font-size: 15px;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .prose-brewprint h2 {
          color: rgba(255,255,255,0.9);
          font-size: 1.05rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        .prose-brewprint h3 {
          color: rgba(255,255,255,0.7);
          font-size: 0.85rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .prose-brewprint ul {
          color: rgba(255,255,255,0.55);
          font-size: 15px;
          line-height: 1.75;
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .prose-brewprint li {
          margin-bottom: 0.5rem;
        }
        .prose-brewprint a {
          color: rgba(217,142,74,0.85);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose-brewprint strong {
          color: rgba(255,255,255,0.75);
          font-weight: 600;
        }
        .section-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 2.5rem 0 0;
        }
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px 16px;
        }
        .toc-list li {
          font-size: 12px;
          margin: 0;
        }
        .toc-list a {
          color: rgba(255,255,255,0.35);
          text-decoration: none;
        }
        .toc-list a:hover {
          color: rgba(217,142,74,0.7);
        }
      `}</style>
    </main>
  )
}

const toc = [
  'Our Services', 'Intellectual Property Rights', 'User Representations',
  'User Registration', 'Purchases and Payment', 'Subscriptions',
  'Prohibited Activities', 'User Generated Contributions', 'Contribution License',
  'Guidelines for Reviews', 'Mobile Application License', 'Third-Party Websites and Content',
  'Advertisers', 'Services Management', 'Privacy Policy',
  'Copyright Infringements', 'Term and Termination', 'Modifications and Interruptions',
  'Governing Law', 'Dispute Resolution', 'Corrections',
  'Disclaimer', 'Limitations of Liability', 'Indemnification',
  'User Data', 'Electronic Communications', 'California Users and Residents',
  'Miscellaneous', 'Google Maps / Places', 'Algorithmic Matching', 'Contact Us',
]

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id}>
      <hr className="section-divider" />
      <h2>{title}</h2>
      {children}
    </div>
  )
}
