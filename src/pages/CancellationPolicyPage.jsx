import React, { useEffect } from "react";
import { FaTimesCircle, FaExchangeAlt, FaBusAlt, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const CancellationPolicyPage = () => {
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
        <div className="bg-red-600 py-6 px-6 flex items-center">
          <FaTimesCircle className="text-white text-4xl mr-4" />
          <h1 className="text-2xl font-bold text-white">Cancellation Policy</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="space-y-8">
            <div 
              className="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg"
              data-aos="fade-right"
            >
              <div className="flex">
                <FaExclamationTriangle className="text-red-500 text-xl mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium mb-2">Important Notice:</p>
                  <p className="text-gray-700">
                    Any cancelled tickets amount will be credited in your account within 5 to 7 bank working days.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Cancellation Ticket Terms Depend On Operator Cancellation Policy.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4" data-aos="fade-up">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaInfoCircle className="text-red-500 mr-2" />
                Note on Cancellation Policies
              </h2>
              <p className="text-gray-700 pl-7">
                Some bus operators do not allow cancellations and hence no refund is possible in such cases. 
                Some bus operators charge higher cancellation penalties while some allow cancellation up to 
                4 hours before departure. Please contact any of our support care for cancellation details on 
                any specific service.
              </p>
            </div>

            <div className="space-y-4" data-aos="fade-up">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaExchangeAlt className="text-red-500 mr-2" />
                Non-Transferable Tickets
              </h2>
              <p className="text-gray-700 pl-7">
                Once a bus ticket is issued, it is non-transferable. If a ticket is presented by someone other 
                than the person entitled to be carried there-under or to refund in connection therewith, 
                Sri Vinayaka Travels or any of its travel partners shall not be liable to the person so entitled, 
                if in good faith it provides carriage or makes a refund to the person presenting the ticket.
              </p>
            </div>

            <div className="space-y-4" data-aos="fade-up">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaBusAlt className="text-red-500 mr-2" />
                Bus Type Changes
              </h2>
              <p className="text-gray-700 pl-7">
                In case the bus operator changes the type of bus due to some reason, Sri Vinayaka Travels will not be responsible.
              </p>
            </div>

            <div 
              className="bg-gray-100 rounded-lg p-6 mt-8 border border-gray-200"
              data-aos="fade-up"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Decline</h3>
              <p className="text-gray-700">
                We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising 
                directly or indirectly out of the decline of authorization for any Transaction, on Account of the 
                Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
              </p>
            </div>

            <div 
              className="bg-red-50 rounded-lg p-6 mt-4 border border-red-100"
              data-aos="fade-up"
            >
              <h3 className="text-lg font-semibold text-red-800 mb-2">Cancellation Charges</h3>
              <p className="text-gray-700 mb-4">
                Cancellation charges typically vary based on how much in advance you cancel your ticket:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-red-100">
                      <th className="py-3 px-4 text-left text-gray-700 font-medium">Timing</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-medium">Charge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-gray-700">More than 24 hours before departure</td>
                      <td className="py-3 px-4 text-gray-700">10% of ticket fare</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">12 to 24 hours before departure</td>
                      <td className="py-3 px-4 text-gray-700">25% of ticket fare</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">6 to 12 hours before departure</td>
                      <td className="py-3 px-4 text-gray-700">50% of ticket fare</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">Less than 6 hours before departure</td>
                      <td className="py-3 px-4 text-gray-700">No refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-red-600 mt-4 text-sm font-medium">
                * These are general guidelines. Actual cancellation charges are determined by the bus operator's policy.
              </p>
            </div>

            <div 
              className="border-t border-gray-200 pt-6 mt-6"
              data-aos="fade-up"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
              <p className="text-gray-700">
                For any questions regarding cancellations or refunds, please contact our customer support:
              </p>
              <div className="mt-3">
                <p className="text-red-600 font-medium">support@srivinayakatravels.com</p>
                <p className="text-red-600 font-medium">+91 9876543210</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyPage;