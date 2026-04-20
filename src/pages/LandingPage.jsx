import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <h2>EduConsult</h2>
        </div>

        <nav className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className={styles.authButtons}>
          <Link to="/login" className={`${styles.btn} ${styles.btnOutline}`}>
            Login
          </Link>
          <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
            Register
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.badge}>Study Abroad Management System</span>
          <h1>
            Manage Students, Counselors, Universities, and Courses in One Place
          </h1>
          <p>
            A modern consultancy management platform for handling admissions,
            student records, counselors, fee structures, packages, and tour
            services with ease.
          </p>

          <div className={styles.heroButtons}>
            <Link
              to="/register"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.bigBtn}`}
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className={`${styles.btn} ${styles.btnOutline} ${styles.bigBtn}`}
            >
              Login
            </Link>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroCard}>
            <h3>Why Choose EduConsult?</h3>
            <ul>
              <li>Student and counselor management</li>
              <li>Course and university handling</li>
              <li>Fee structure and package management</li>
              <li>Admin profile and role management</li>
              <li>Tour and consultancy services</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.features} id="features">
        <h2>Core Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Student Management</h3>
            <p>
              Add, update, and manage student records efficiently from one
              dashboard.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>University & Courses</h3>
            <p>
              Track universities and courses to guide students with better
              options.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>Counselor Handling</h3>
            <p>
              Organize counselor information and assign responsibilities easily.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>Consultancy Services</h3>
            <p>
              Handle consultancy workflows, packages, and tour-related services
              from a single system.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={styles.aboutContent}>
          <h2>About the Platform</h2>
          <p>
            This platform is built for educational consultancies to simplify the
            complete workflow — from student onboarding to course selection,
            counselor coordination, package handling, and administrative
            control.
          </p>
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <h2>Ready to Get Started?</h2>
        <p>
          Register now and streamline your consultancy operations with a
          professional dashboard.
        </p>
        <div className={styles.contactButtons}>
          <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
            Create Account
          </Link>
          <Link to="/login" className={`${styles.btn} ${styles.btnOutline}`}>
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}