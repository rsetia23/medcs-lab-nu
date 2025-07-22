import React from "react";
import mihalisImg from "../assets/people/Mihalis_K.jpeg";
import rahulImg from "../assets/people/Rahul_S.jpeg";
import smyanImg from "../assets/people/Smyan_S.jpeg";
import arjunImg from "../assets/people/Arjun_R.jpeg";
import naliniImg from "../assets/people/Nalini_S.jpeg";
import gauravImg from "../assets/people/Gaurav_B.jpeg";
import drMohitSinghal from "../assets/people/Mohit_S.jpeg";
import drJohnAdams from "../assets/people/John_A.jpeg";
import drArielHamlin from "../assets/people/Ariel_H.jpeg";

const advisors = [
  { name: "Dr. Mohit Singhal", role: "CS/DS Advisor", image: drMohitSinghal },
  { name: "Dr. John Adams", role: "Life Science Advisor", image: drJohnAdams },
  { name: "Dr. Ariel Hamlin", role: "Onboarding Director", image: drArielHamlin },
];

const eboard = [
  { name: "Mihalis Koutouvos", role: "Director of Operations", image: mihalisImg },
  { name: "Smyan Sengupta", role: "Operations Assistant", image: smyanImg },
  { name: "Arjun Roy", role: "Director of Outreach Programs", image: arjunImg },
  { name: "Nalini Singh", role: "Director of Marketing", image: naliniImg },
  { name: "Gaurav Bhatnagar", role: "Director of Grants and Finances", image: gauravImg },
  { name: "Rahul Setia", role: "Director of Technology and Student Affairs", image: rahulImg },
//   { name: "SLC Representative", role: "N/A", image: "/team/placeholder.jpg" }, // fallback
];

const TeamGrid = ({ members }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
    {members.map((member, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-lg shadow hover:shadow-md text-center transition"
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-28 h-28 rounded-full mx-auto object-cover mb-4"
        />
        <h3 className="text-xl font-semibold text-medcsblue">{member.name}</h3>
        <p className="text-gray-700 mt-1 text-sm">{member.role}</p>
      </div>
    ))}
  </div>
);

const OurTeam = () => {
  return (
    <section id="team" className="w-full bg-gray-50 text-gray-900 px-6 py-20">
      <h2 className="text-3xl font-bold text-center text-medcsblue">Our Team</h2>

      <div className="max-w-6xl mx-auto mt-12">
        <h3 className="text-2xl font-semibold text-medcsblue mb-2">Advisors</h3>
        <TeamGrid members={advisors} />

        <h3 className="text-2xl font-semibold text-medcsblue mt-12 mb-2">E-Board</h3>
        <TeamGrid members={eboard} />
      </div>
    </section>
  );
};

export default OurTeam;
