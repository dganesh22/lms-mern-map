import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className='container pt-5'>
        <div className="row bg-theme p-5">
          <div className="col-md-12 text-center">
              <h1 className="display-1 text-light">
                  Become the <span className="text-success">Full Stack Developer</span> and <span className="text-danger">Software Engineer</span> that companies <span className="text-info">Love to Hire.</span>
              </h1>
          </div>
        </div>

        <div className="row mt-4 p-5">
          <div className="col-md-12 text-center">
              <h3 className="display-3 text-theme">Features</h3>
          </div>
        </div>

        <div className="row mt-4 p-5">
            <div className="col-md-6">
                <img src={`${process.env.PUBLIC_URL}/images/coding.svg`} alt="" className="img-fluid" />
            </div>
            <div className="col-md-6">
                <h4 className="text-success">Fast-track your learning</h4>
                <h5 className="display-5 text-theme">No Fluff, Just the Good Stuff</h5>
                <p className="text-theme">We don't want to waste your time with boring stuff you don't need. So we've made sure our courses are clear, concise, to the point, and free of technical jargon. No rambling or repetition, just the essentials you need to succeed, explained in plain English.</p>
            </div>
        </div>

        <div className="row mt-4 p-5">
            <div className="col-md-6">
                <h4 className="text-success">Fun and Engaging Contents</h4>
                <h5 className="display-5 text-theme">Aim to Reach Millions of Users</h5>
                <p className="text-theme">We aim to teach and get trust by millions of people how to code and how to become to fullstack developer professional through our series of courses. </p>

                <p className="text-theme">We humbled and thrilled to be a part of your programming journey. When you are joining us, you're joining a group of world class LMS-team will help you in every step of your fullstack journey.</p>

                <p className="text-theme">LMS provide you <NavLink to={`/forum`}>forum</NavLink> to discuss your technical questions with the team of like minded people who are all working towards the same goal.</p>
            </div>
            <div className="col-md-6">
                <img src={`${process.env.PUBLIC_URL}/images/programming.svg`} alt="" className="img-fluid" />
            </div>
        </div>

        <div className="row mt-4 p-5">
            <div className="col-md-6">
                <img src={`${process.env.PUBLIC_URL}/images/firmware.svg`} alt="" className="img-fluid" />
            </div>
            <div className="col-md-6">
                <h4 className="text-success">Perfect Mix of theory and Practical</h4>
                <h5 className="display-5 text-theme">Hands on Learning</h5>
                <p className="text-theme"> We belive the best way to learn development is by actually doing the programming. That's why our courses teach you the essential theorical part the indivial topics and provide hand's on practical excercises releated the topic on basis of projects. </p>

                <p className="text-theme"> You will be able to practice every excercises and you apply the theroy concepts in practical with in development of projects. Here additional you are learning various debugging tools like , <strong className="text-danger">Browser Extensions,Debugging tools, Api testing tools,</strong> and apply it in real-life situations.</p>
            </div>
        </div>

        <div className="row mt-4 p-5">
            <div className="col-md-6">
                <h4 className="text-success">Get Ready for the web</h4>
                <h5 className="display-5 text-theme">Code Real-World Projects</h5>
                <p className="text-theme">Our Courses are desined to prepare you for real-world projects, jobs and interviews. With in-depth, comprehensive courses packed with the real-world examples and excercises, you will be ready to take on any challenge that comes in your way. </p>
            </div>
            <div className="col-md-6">
                <img src={`${process.env.PUBLIC_URL}/images/code_typing.svg`} alt="" className="img-fluid" />
            </div>
        </div>
    </div>
  )
}

export default Home