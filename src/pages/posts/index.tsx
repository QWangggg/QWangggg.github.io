import { Link } from 'umi';
import styles from './index.less';

const posts = [
  {
    id: 1,
    title: 'Getting Started with React',
    excerpt:
      'Learn the basics of React and how to create your first component.',
    date: '2023-05-15',
    tags: ['React', 'JavaScript', 'Frontend'],
  },
  {
    id: 2,
    title: 'UmiJS Tutorial',
    excerpt: 'A comprehensive guide to building applications with UmiJS.',
    date: '2023-06-20',
    tags: ['UmiJS', 'React', 'Frontend'],
  },
  {
    id: 3,
    title: 'Deploying to GitHub Pages',
    excerpt: 'Learn how to deploy your React application to GitHub Pages.',
    date: '2023-07-10',
    tags: ['GitHub', 'Deployment', 'DevOps'],
  },
  {
    id: 4,
    title: 'CSS-in-JS vs CSS Modules',
    excerpt:
      'Comparing different styling approaches in modern React applications.',
    date: '2023-08-05',
    tags: ['CSS', 'React', 'Styling'],
  },
  {
    id: 5,
    title: 'State Management in React',
    excerpt:
      'Exploring different state management solutions for React applications.',
    date: '2023-09-12',
    tags: ['React', 'State Management', 'Redux'],
  },
];

export default function PostsPage() {
  return (
    <div className={styles.postsContainer}>
      <h2 className={styles.pageTitle}>Blog Posts</h2>

      <div className={styles.postsWrapper}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postItem}>
            <h3>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
            <div className={styles.postMeta}>
              <span className={styles.postDate}>{post.date}</span>
              <div className={styles.postTags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            <Link to={`/posts/${post.id}`} className={styles.readMore}>
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
