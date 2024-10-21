import Link from 'next/link';
import React from 'react';

function About() {
    const [contributor, setContributor] = React.useState("infoldArrow");
    const [contributorText, setContributorText] = React.useState("infoldText");
    const [digital, setDigital] = React.useState("infoldArrow");
    const [digitalText, setDigitalText] = React.useState("infoldText");
    const [physical, setPhysical] = React.useState("infoldArrow");
    const [physicalText, setPhysicalText] = React.useState("infoldText");
    const [abstract, setAbstract] = React.useState("infoldArrow");
    const [abstractText, setAbstractText] = React.useState("infoldText");

    function toggleContributor(){
      if(contributor==="unfoldArrow"){
        setContributor("infoldArrow");
        setContributorText("infoldText");
      }else{
        setContributor("unfoldArrow");
        setContributorText("unfoldText");
      }
    }

    function toggleDigital(){
      if(digital==="unfoldArrow"){
        setDigital("infoldArrow");
        setDigitalText("infoldText");
      }else{
        setDigital("unfoldArrow");
        setDigitalText("unfoldTextDigital");
      }
    }

    function togglePhysical(){
      if(physical==="unfoldArrow"){
        setPhysical("infoldArrow");
        setPhysicalText("infoldText");
      }else{
        setPhysical("unfoldArrow");
        setPhysicalText("unfoldTextPhysical");
      }
    }

    function toggleAbstract(){
      if(abstract==="unfoldArrow"){
        setAbstract("infoldArrow");
        setAbstractText("infoldText");
      }else{
        setAbstract("unfoldArrow");
        setAbstractText("unfoldTextAbstract");
      }
    }




  return(
    <>
    <div className="aboutContainer">
      <p className="aboutIntro">
          is a social anti-social media platform.<br/><br/>
          No likes.<br/>
          No comments.<br/>
          No beautifiers.<br/>
          No followers.<br/>
          No names.<br/>
          No faces.<br/>
          No judgement.<br/><br/>
           <Link href="/dropoff">
           <span className="aboutBold highlight">Join now for an unbiased society &rarr;</span>
           </Link>
           </p>

           <p onClick={toggleContributor} className="highlight aboutUppercase">
                <span className={contributor}>&rarr;</span> Become a contributor
          </p>
          <p className={contributorText}>
             Share your life that doesn't fit the social media world either as virtual or physical drop-off.
             With a generated code you become a completely anonymous contributor. Get closer by sharing the real stuff.
          </p>

          <p onClick={toggleDigital} className="highlight aboutUppercase">
              <span className={digital}>&rarr;</span> Digital drop-off
           </p>
           <p className={digitalText}>
              Virtual drop-offs* are displayed in the online collection after a few hours.
              <br/><br/>
              * drop-offs are stories, events, things, dreams, anecdotes, banalities,
              artifacts, documents, digital imprints and so on. All these informations reflect
              your personality, which either have an emotional connection with yourself and make you tangible.
            </p>

            <p  onClick={togglePhysical} className="aboutUppercase highlight">
              <span className={physical}>&rarr;</span> physical drop-off
            </p>
            <p className={physicalText}>
              Physical drop-offs* are professionally photographed and then displayed in the online
              collection. Use the provided bag at the drop box located on your right.
              Additionally, these objects will be exhibited on the wall until 12 of september 2021.
              <br/><br/>
              * drop-offs are stories, events, things, dreams, anecdotes, banalities,
              artifacts, documents, digital imprints and so on. All these informations reflect
              your personality, which either have an emotional connection with yourself and make you tangible.
            </p>

            <p onClick={toggleAbstract} className="aboutUppercase highlight">
              <span className={abstract}>&rarr;</span> Abstract
            </p>
            <p className={abstractText}>
              Personendepot is a social anti-social media platform.
               There are no likes, no comment sections, no beautifiers, no followers.
               It is a space that anonymously stores your private insights and makes
               them visible to the public.
               Personendepot empowers you to get closer to strangers by sharing
               unique glimpses into your private life. The participants themselves decide which personal details are to be included in the Personendepot.
               The result is an extensive collection of personal stories that can be viewed publicly.
               This accessible and open way enables a feeling of connection without actually being connected.
               Browsing through the collection inevitably leads to self-reflection and a sense of belonging.
              What would you share in an anonymous space?
              Show your life that doesn't fit into the regular social media world.
            </p>

            <p>
              <a href="mailto:info@personendepot.ch" className="aboutUppercase highlight">&rarr; contact</a>
            </p>
    </div>

    </>
  );
}

export default About;
