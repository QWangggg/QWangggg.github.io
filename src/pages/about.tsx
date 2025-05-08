import { Link } from 'umi';
import styles from './about.less';

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.pageTitle}>About Me</h2>

      <div className={styles.aboutContent}>
        <div className={styles.profileImage}>
          <div className={styles.imagePlaceholder}>
            <span>👨‍💻</span>
          </div>
        </div>
        <div className={styles.bio}>
          <p>
            Hello! I'm a passionate web developer with a focus on modern
            JavaScript frameworks and libraries. I love building user-friendly
            and performant web applications.
          </p>
          <p>
            I created this blog to share my knowledge and experiences with the
            development community. Here, I write about React, UmiJS, and other
            frontend technologies.
          </p>
          <p>
            When I'm not coding, you can find me hiking, reading tech books, or
            experimenting with new programming languages and frameworks.
          </p>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <h3>My Skills</h3>
        <div className={styles.skillsList}>
          <div className={styles.skillItem}>
            <span className={styles.skillName}>React</span>
            <div className={styles.skillBar}>
              <div className={styles.skillLevel} style={{ width: '90%' }}></div>
            </div>
          </div>
          <div className={styles.skillItem}>
            <span className={styles.skillName}>JavaScript</span>
            <div className={styles.skillBar}>
              <div className={styles.skillLevel} style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className={styles.skillItem}>
            <span className={styles.skillName}>TypeScript</span>
            <div className={styles.skillBar}>
              <div className={styles.skillLevel} style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className={styles.skillItem}>
            <span className={styles.skillName}>UmiJS</span>
            <div className={styles.skillBar}>
              <div className={styles.skillLevel} style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className={styles.skillItem}>
            <span className={styles.skillName}>CSS/LESS</span>
            <div className={styles.skillBar}>
              <div className={styles.skillLevel} style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contactSection}>
        <h3>Contact Me</h3>
        <p>
          Feel free to reach out if you have any questions or just want to
          connect!
        </p>
        <div className={styles.socialLinks}>
          <a
            href="https://github.com/QWangggg"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            GitHub
          </a>
          <a href="#" className={styles.socialLink}>
            Twitter
          </a>
          <a href="#" className={styles.socialLink}>
            LinkedIn
          </a>
          <a href="mailto:example@example.com" className={styles.socialLink}>
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
