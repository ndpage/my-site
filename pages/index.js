import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
//import { getSortedPostsDataFS } from '../lib/posts' //This parses the posts .md files
//import Date from '../components/date'

import groq from 'groq'
import client from '../client'

const query = groq`
*[_type == "post" && publishedAt < now()]|order(publishedAt desc)
`
/*
  getStaticProps function is used to render a page with data.
  This index.js page uses static side generation
  export async function getStaticProps() {
    const allPostsData = getSortedPostsDataFS()
    
    return {
      props: {
        allPostsData
      }
    }
  }
  */
  
export async function getStaticProps(){
  const allPostsData = await client.fetch(query)
  return {
    props: {
      allPostsData,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 5, // In seconds
  }
}


/**
 * Function: Home({allPostsData}) 
 * Description: The Home function houses the short bio and the links to the blog posts
 *               Blog posts are parsed by getSortedPostsDataFS() and displayed with getStaticProps() 
 */
export default function Home({allPostsData}) {
  return (
    <>
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <article>
        <p>
          Control systems and software engineer based in Greenville, South Carolina. I love to learn new technologies and help others learn too. 
        </p>
        <p> 
            Check out my blog posts below to learn more about me and my interests
        </p>
        <Link href="/author/nathan-page">
          <a>
            About Me
          </a>
        </Link>
      </article>
      <section>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(
              ({ _id, title = '', slug = '', publishedAt = '' }) =>
                slug && (
                  <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                    <a> 
                      <li key={_id} className={utilStyles.listItem}>
                        {title}{'  '}({new Date(publishedAt).toDateString()})
                     </li>
                   </a>
                </Link>
                )
              )}
        </ul>
      </section>
    </Layout>
    </>
  )
}