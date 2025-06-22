import React from "react";

const Accordian = ({ data }) => {
  return (
    <div className="w-full bg-black text-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {data.map((res) => (
            <div
              key={res.id}
              className="collapse collapse-arrow border border-gray-600 bg-[#2c2c2c] rounded-md"
            >
              <input type="radio" name="accordion" />
              <div className="collapse-title text-lg font-medium text-white">
                {res.question}
              </div>
              <div className="collapse-content text-gray-300 text-sm leading-relaxed">
                {res.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordian;
