import React, { useEffect, useState } from "react";
import sanityClient from "../sanityClient";

const TeamGrid = ({ members }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
    {members.map((member, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-lg shadow hover:shadow-md text-center transition"
      >
        <img
          src={member.imageUrl}
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
  const [advisors, setAdvisors] = useState([]);
  const [eboard, setEboard] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "teamMember"]{
          name,
          role,
          group,
          "imageUrl": image.asset->url
        }`);

        setAdvisors(data.filter((person) => person.group === "advisor"));
        setEboard(data.filter((person) => person.group === "eboard"));
      } catch (err) {
        console.error("Error fetching team members:", err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section id="team" className="w-full bg-gray-50 text-gray-900 px-6 py-20">
      <h2 className="text-3xl font-bold text-center text-medcsblue">Our Team</h2>

      <div className="max-w-6xl mx-auto mt-12">
        {advisors.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-medcsblue mb-2">Advisors</h3>
            <TeamGrid members={advisors} />
          </>
        )}

        {eboard.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-medcsblue mt-12 mb-2">E-Board</h3>
            <TeamGrid members={eboard} />
          </>
        )}
      </div>
    </section>
  );
};

export default OurTeam;
