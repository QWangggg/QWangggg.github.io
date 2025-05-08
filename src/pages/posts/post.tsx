import { Link, useParams } from 'umi';
import styles from './post.less';

interface PostData {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
}

interface PostCollection {
  [key: number]: PostData;
}

const posts: PostCollection = {
  1: {
    id: 1,
    title: 'Getting Started with React',
    content: `
      <p>React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page. The main purpose of React is to be fast, scalable, and simple.</p>
      
      <h3>Creating Your First Component</h3>
      <p>Let's create a simple React component that displays a greeting message:</p>
      
      <pre><code>
      import React from 'react';

      function Greeting(props) {
        return (
          &lt;div&gt;
            &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;
            &lt;p&gt;Welcome to React.&lt;/p&gt;
          &lt;/div&gt;
        );
      }

      export default Greeting;
      </code></pre>
      
      <p>To use this component, you would import it and include it in your JSX like this:</p>
      
      <pre><code>
      import Greeting from './Greeting';

      function App() {
        return (
          &lt;div&gt;
            &lt;Greeting name="John" /&gt;
          &lt;/div&gt;
        );
      }
      </code></pre>
      
      <h3>State and Lifecycle</h3>
      <p>React components can have state, which allows them to respond to user input and other events. Here's an example of a simple counter component:</p>
      
      <pre><code>
      import React, { useState } from 'react';

      function Counter() {
        const [count, setCount] = useState(0);
        
        return (
          &lt;div&gt;
            &lt;p&gt;You clicked {count} times&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;
              Click me
            &lt;/button&gt;
          &lt;/div&gt;
        );
      }
      </code></pre>
      
      <p>This component uses the useState hook to add state to a functional component. When the button is clicked, the count is incremented and the component re-renders to display the new value.</p>
    `,
    date: '2023-05-15',
    author: 'Jane Doe',
    tags: ['React', 'JavaScript', 'Frontend'],
  },
  2: {
    id: 2,
    title: 'UmiJS Tutorial',
    content: `
      <p>UmiJS is an extensible enterprise-level front-end application framework based on React. Umi is a routing-based framework that supports various advanced features out of the box, such as code splitting, server-side rendering, and more.</p>
      
      <h3>Getting Started with UmiJS</h3>
      <p>To create a new Umi project, you can use the following command:</p>
      
      <pre><code>
      $ npx @umijs/create-umi-app
      </code></pre>
      
      <p>This will create a new directory with a basic Umi project structure.</p>
      
      <h3>Routing in UmiJS</h3>
      <p>Umi uses a file-system based routing approach. Files in the pages directory automatically become available routes. For example:</p>
      
      <pre><code>
      + pages/
        + users/
          - index.tsx
          - [id].tsx
        - index.tsx
        - about.tsx
      </code></pre>
      
      <p>This structure would create the following routes:</p>
      <ul>
        <li>/ - pages/index.tsx</li>
        <li>/users - pages/users/index.tsx</li>
        <li>/users/:id - pages/users/[id].tsx</li>
        <li>/about - pages/about.tsx</li>
      </ul>
      
      <h3>Using Plugins</h3>
      <p>Umi has a plugin system that allows you to extend its functionality. For example, to add antd support, you can install the @umijs/plugin-antd plugin:</p>
      
      <pre><code>
      $ npm install @umijs/plugin-antd
      </code></pre>
      
      <p>Then, in your .umirc.ts file, you can enable the plugin:</p>
      
      <pre><code>
      import { defineConfig } from 'umi';

      export default defineConfig({
        plugins: ['@umijs/plugin-antd'],
        // other configuration...
      });
      </code></pre>
    `,
    date: '2023-06-20',
    author: 'John Smith',
    tags: ['UmiJS', 'React', 'Frontend'],
  },
  3: {
    id: 3,
    title: 'Deploying to GitHub Pages',
    content: `
      <p>GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website.</p>
      
      <h3>Setting Up GitHub Pages</h3>
      <p>To deploy your React application to GitHub Pages, you'll need to follow these steps:</p>
      
      <h4>Step 1: Install the gh-pages package</h4>
      <pre><code>
      $ npm install gh-pages --save-dev
      </code></pre>
      
      <h4>Step 2: Add homepage to package.json</h4>
      <p>In your package.json file, add a homepage field that specifies the URL where your site will be deployed:</p>
      
      <pre><code>
      {
        "name": "my-app",
        "homepage": "https://username.github.io/repository-name",
        // other fields...
      }
      </code></pre>
      
      <h4>Step 3: Add deployment scripts</h4>
      <p>Add the following scripts to your package.json:</p>
      
      <pre><code>
      "scripts": {
        // other scripts...
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build"
      }
      </code></pre>
      
      <h4>Step 4: Deploy the site</h4>
      <p>Run the following command to deploy your site:</p>
      
      <pre><code>
      $ npm run deploy
      </code></pre>
      
      <p>This will build your application and push the build files to the gh-pages branch of your repository. GitHub will then deploy your site from this branch.</p>
      
      <h3>Custom Domain</h3>
      <p>If you want to use a custom domain with your GitHub Pages site, you'll need to:</p>
      
      <ol>
        <li>Add a CNAME file to your repository with your domain name.</li>
        <li>Configure your domain's DNS settings to point to GitHub's servers.</li>
      </ol>
      
      <p>For more information, see GitHub's documentation on <a href="https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site">configuring a custom domain</a>.</p>
    `,
    date: '2023-07-10',
    author: 'Alex Johnson',
    tags: ['GitHub', 'Deployment', 'DevOps'],
  },
};

export default function PostPage() {
  const params = useParams<{ id: string }>();
  const postId = parseInt(params.id || '1', 10);
  const post = posts[postId] || posts[1];

  return (
    <div className={styles.postContainer}>
      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <div className={styles.articleMeta}>
            <span className={styles.articleDate}>{post.date}</span>
            <span className={styles.articleAuthor}>by {post.author}</span>
            <div className={styles.articleTags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className={styles.articleNavigation}>
          <Link to="/posts" className={styles.backToList}>
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
