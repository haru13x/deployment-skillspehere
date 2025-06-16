import React from "react";
import "./About.css";
import janice from "../../assets/janice.jpg";
import france from "../../assets/france.jpg";
import asher from "../../assets/asher.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "Janice Conde",
      role: "Admin",
      img: janice,
    },
    {
      name: "Francine Malagum",
      role: "Admin",
      img: france,
    },
    {
      name: "Asher Abian",
      role: "Admin",
      img: asher,
    },
  ];

  return (
    <div id="About" className="about">
      <h1>About SkillSphere</h1>
      <p>
        SkillSphere is an innovative platform designed to connect freelancers
        with businesses and individuals seeking skilled professionals. Whether
        you’re a freelancer looking for remote gigs or a company searching for
        top talent, SkillSphere provides a seamless experience through an
        intuitive interface, smart job matching, and secure transactions.
      </p>

      <div className="about-boxes">
        <div className="box">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower freelancers and businesses by providing a
            platform that facilitates meaningful connections and opportunities.
          </p>
        </div>

        <div className="box">
          <h2>Our Vision</h2>
          <p>
            We envision a world where freelancers and businesses can easily find
            and collaborate with each other, breaking down geographical barriers
            and creating a global marketplace for skills and services.
          </p>
        </div>

        <div className="box team-box">
          <h2>Our Team</h2>
          <p>
            Our team is composed of experienced professionals from various
            industries, all dedicated to making SkillSphere the best platform
            for freelancers and businesses.
          </p>

          <div className="team-container">
            {teamMembers.map((member, index) => (
              <div className="team-member" key={index}>
                <img src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
