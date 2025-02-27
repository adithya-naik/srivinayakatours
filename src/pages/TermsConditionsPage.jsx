import React, { useEffect } from "react";
import { FaShieldAlt, FaGavel, FaInfoCircle, FaLock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const TermsConditionsPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        data-aos="fade-up"
      >
        <div className="bg-blue-600 py-6 px-6 flex items-center">
          <FaGavel className="text-white text-4xl mr-4" />
          <h1 className="text-2xl font-bold text-white">Terms and Conditions</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500" data-aos="fade-right">
              <div className="flex items-start">
                <FaInfoCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Sri Vinayaka Travels offers travellers to book Ramoji Film City Entry Tickets, Telangana Tourism Packages Booking, Other Local City Sightseeing Tour Packages online right from the comfort of their home or office by providing them with choice of bus operators, departure times and prices. Sri Vinayaka Travels does not own or operate any bus services on its own. Sri Vinayaka Travels does not advise any specific bus operator to its customers. The choice of the bus operator is purely the discretion of the customer.
                </p>
              </div>
            </div>

            <div data-aos="fade-up" className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Departure & Arrival</h2>
              <p className="text-gray-700">
                The arrival and departure times mentioned on the ticket are only tentative timings. Buses may be delayed due to some unavoidable reasons like traffic jams etc. However, the bus will not leave the source before the time that is mentioned on the ticket. Passengers are advised to call the bus operator contact number mentioned in the ticket and reconfirm the boarding point location and departure time on the day of journey. If the passenger did not get any contact number of the bus operator, he/she need to call the Sri Vinayaka Travels Customer Support after booking the ticket and should be at least 3-4 hours prior to their reporting time.
              </p>
            </div>

            <div data-aos="fade-up" className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Boarding Requirements</h2>
              <p className="text-gray-700">
                Passengers are required to furnish the following details at the time of boarding the bus. Failing to do so, they may not be allowed to board the bus.
              </p>
              <ul className="list-disc pl-8 text-gray-700 space-y-2">
                <li>SMS of the ticket or Email. (This is widely accepted by most bus operators)</li>
                <li>Some operators do not accept the electronic ticket formats. We provide the details of such operators while booking tickets on Sri Vinayaka Travels. In such case we request you to kindly carry a printout of the ticket.</li>
                <li>Proof of Identity (Driving License or Aadhar Card or Passport or PAN Card or Voter Card)</li>
              </ul>
            </div>

            <div data-aos="fade-up" className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Operator Classification</h2>
              <p className="text-gray-700">
                Sri Vinayaka Travels Ultimate and Assured classification of Bus Operators is done from time-to-time based on Customer's Feedback and Surveys conducted by Sri Vinayaka Travels. Sri Vinayaka Travels is showing the classification for customers to make an informed decision while choosing a Bus Operator for their journey. The choice of the bus operator is purely at the discretion of the customer. The classification of Bus Operator might change depending on the service performance of bus operator.
              </p>
            </div>

            <div data-aos="fade-up" className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Additional Terms</h2>
              <ul className="list-disc pl-8 text-gray-700 space-y-2">
                <li>The passengers should reach at the mentioned boarding points 15 minutes prior to the scheduled departure time.</li>
                <li>Any complaints/grievances should be reported in a week's time from date of journey performed.</li>
                <li>A booking is considered confirmed if the booking confirmation page is shown to the customer, even if SMS/Email fails to deliver for any reason.</li>
                <li>If ticket confirmation/cancellation, SMS/Email, is not sent for any reason, if reported it can be resent by our support team. SMS/Email might fail to deliver or get delayed for several reasons which are not in Sri Vinayaka Travels's control.</li>
                <li>Payment gateway/service charges – Sri Vinayaka Travels will not charge any additional payment gateway charge or service unless otherwise specified in the booking details page.</li>
              </ul>
            </div>

            <div data-aos="fade-up" className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Insurance & Liabilities</h2>
              <p className="text-gray-700">
                Sri Vinayaka Travels provides a platform to Insurance company to list and advertise their services on the website and App and allows customers You ("Customer/You") to select Insurance Policy, based on your preferences. The listing of an Insurance Policy on the website does not constitute and should not be regarded as a recommendation. Once a reservation is made, and Insurance policy is selected You are agreeing to the terms and conditions of the Insurance Company.
              </p>
              <p className="text-gray-700">
                By making a booking on Sri Vinayaka Travels – customer acknowledges that Sri Vinayaka Travels will Call/Email/SMS or send alerts to give/take information regarding his/her bookings.
              </p>
              <p className="text-gray-700">
                In case of any claims arising out of unforeseen consequences/exigencies, Sri Vinayaka Travels liability would be limited to the extent of the value of the booking amount.
              </p>
            </div>

            <div data-aos="fade-up" className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Legal Jurisdiction</h2>
              <p className="text-gray-700">
                The terms and conditions of our services can be amended, modified or withdrawn by Sri Vinayaka Travels at any time without notice.
              </p>
              <p className="text-gray-700">
                All legal disputes are subject to exclusive jurisdiction of the competent courts in Hyderabad (Telangana) only.
              </p>
            </div>

            <div data-aos="fade-up" className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Disclaimer</h2>
              <p className="text-gray-700">
                Sri Vinayaka Travels is not responsible if any Wrong Origin-Destination combination booked by the passenger. In that cases, Sri Vinayaka Travels can not cancel the ticket. It is based on the cancellation policy.
              </p>
              <p className="text-gray-700">
                Sri Vinayaka Travels is not responsible if any Origin City Name or Destination City Name exists in two different states and the passenger booked another state city instead of their desired city. Passenger has to verify the details and should have basic knowledge on their route which they want to travel.
              </p>
              <p className="text-gray-700">
                By submitting our webform, you agree to receive promotional calls on the number shared, and such calls and SMS would be coming from a third-party platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;