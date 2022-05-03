import React from 'react'
import { ContentContainer } from '../../ux/ContentContainer'


/**
 * Container for list of ImgDynamic components
 * @returns {React.ReactElement}
 */
const PrplContainer = () => {

  return (<>
    <ContentContainer
      title="PRPL"
      codeLink="https://github.com/fsjsd/frontend-patterns/blob/main/src/AppPreload.tsx"
    >
      <div role="main">
        <p>
          PRPL is a pattern to load web sites / web applications quickly -
        </p>
        <ul>
          <li>Push critical resources efficiently to minimise browser roundtrips</li>
          <li>Render the first site route ASAP</li>
          <li>Pre-cache assets for frequently accessed routes</li>
          <li>Lazy load non priority routes / assets</li>
        </ul>
        <p>
          PRPL happens behind the scenes, so you&apos;ll need to refresh the page to see this demo
        </p>
        <p>
          When you loaded this page, PRPL techniques I&apos;ve applied to this code base
          influenced your first-time-use experience.
        </p>
        <p>
          Whilst these techniques don&apos;t fully cover all four PRPL areas, I want to showcase one
          technique you can leverage in React code bases to improve your page load experience.
        </p>
        <h2>Inlining Critical CSS &amp; resources</h2>
        <p>
          How do you make your application appear instantly?
        </p>
        <p>
          You work out the minimum amount of HTML and CSS required to
          render <i>something</i> meaningful for your user and send this HTML &amp; CSS
          inline as your first response to the user.
        </p>
        <p>
          This inline HTML/CSS loads immediately, giving your async javascript/css files a chance to download, run and
          render the full page app as you expect.
        </p>
        <p>
          To see my technique in this repo at work, force refresh this page in your browser now - notice the loading &quot;tombstones&quot;
          as it loads.
        </p>
        <p>
          This technique is relevant to Javascript applications (e.g. SPA&apos;s) that require a significant amount or
          code to download, parse and run before the page can be rendered.
        </p>
        <p>
          It&apos;s not especially relevant to server side rendering (SSR) solutions that handle this natively
          like like Gatsy, Next.js or Remix.
        </p>
        <p>
          For classic SPA&apos;s or React apps built with toolchains
          like <a target="_blank" title="Create React App" href="https://github.com/facebook/create-react-app" rel="noreferrer">Create React App (CRA)</a> or
          even custom builts with webpack etc, this technique is workable.
        </p>
        <h2>Don&apos;t repeat yourself (DRY)</h2>
        <p>
          The HTML &amp; CSS React apps produce is heavily governed by code and dependency choices (e.g. styled components), and
          of in the SPA/CRA scenario, constructed directly in the DOM.
        </p>
        <p>
          So how can we maintain preload HTML/CSS in React but load it statically?
        </p>
        <p>
          A little bit of a hack, but here&apos;s how to do it -
        </p>
        <p>
          First, check out the React code for the &quot;shell&quot; of this web app:
        </p>
        <p>
          <a target="_blank" href="https://github.com/fsjsd/frontend-patterns/blob/main/src/App.tsx" rel="noreferrer">https://github.com/fsjsd/frontend-patterns/blob/main/src/App.tsx</a>
        </p>
        <p>
          Without worrying about <i>what</i> individual components do in the code, understand most of the components
          at here simply setup the layout and navigation of the page here, ultimately loading actual functionality
          from the leaf JSX nodes (e.g. React router, content components like NavigationMenu).
        </p>
        <p>
          I&apos;ve taken deliberate care to apply <i>separation of concerns</i> in App.tsx, so purely presentational React
          components don&apos;t contain side effects and even wrapper CSS components (containers, headers etc) are seperate from
          content (text, links, etc) components.
        </p>
        <p>
          This means I can very easily take that <i>same</i> shell code for the app and strip it of all functionality, leaving a
          hollow shell.
        </p>
        <p>
          You can see that here:
        </p>
        <p>
          <a target="_blank" href="https://github.com/fsjsd/frontend-patterns/blob/main/src/AppPreload.tsx" rel="noreferrer">https://github.com/fsjsd/frontend-patterns/blob/main/src/AppPreload.tsx</a>
        </p>
        <p>
          Looks similar yes?
        </p>
        <p>
          Note this &quot;preload&quot; version of the shell contains one difference - the TombStoneContent component,
          which displays a loading animation when rendered (again - force refresh the page here to see this).
        </p>
        <p>
          So I&apos;ve implemented (and thus need to maintain) two React components here - the full
          app, and &quot;loading&quot; version. The question is -
        </p>
        <p>
          How do we send the preload version without using React?
        </p>
        <p>
          There are actually two options -
        </p>
        <ol>
          <li>Render and capture HTML / CSS through Jest snapshot tests</li>
          <li>Render and capture HTML / CSS through the browser</li>
        </ol>
        <p>
          Before going into the <i>how</i> of each of these options, understand both techniques
          are utilising React to render the preload version to HTML / CSS, then I need to manually
          copy that output into the static index.html root file (in my CRA app) to achieve the inlining
          effect. This could probably be automated, but is easy and infrequent enough to manage
          manually without accidentally affecting other static HTML element declarations in the
          index.html file.
        </p>
        <h3>Render with Jest</h3>
        <p>
          The Jest option I&apos;ve used relies on snapshot tests to capture the HTML rendered by the
          preload component. The test is a two liner -
        </p>
        <p>
          <a target="_blank" href="https://github.com/fsjsd/frontend-patterns/blob/main/src/AppPreload.test.tsx" rel="noreferrer">https://github.com/fsjsd/frontend-patterns/blob/main/src/AppPreload.test.tsx</a>
        </p>
        <p>
          Additionally, it leverages both styled components <i>and</i> the jest-styled-components package
          to render and capture the CSS used by the preload components within the snapshot. This approach is
          great because the CSS gets a &quot;tree shake&quot; during the test run meaning you get the bare
          minimum CSS needed to run the preload components.
        </p>
        <p>
          Here&apos;s the snapshot output the test generates that I copy into index.html -
        </p>
        <p>
          <a target="_blank" href="https://github.com/fsjsd/frontend-patterns/blob/main/src/__snapshots__/AppPreload.test.tsx.snap" rel="noreferrer">https://github.com/fsjsd/frontend-patterns/blob/main/src/__snapshots__/AppPreload.test.tsx.snap</a>
        </p>
        <p>
          One drawback I found with this approach is jest-styled-components doesn&apos;t render CSS keyframes
          in it&apos;s output (possibly meaning other CSS feature like variables may not render as well).
          I had to locate and copy keyframes for my tombstone animation manually to include them in index.html.
          Annoying, but easy enough.
        </p>
        <h3>Render in Browser</h3>
        <p>
          Take a look at that AppPreload.tsx code in the link above and you&apos;ll notice a commented section in the code.
        </p>
        <p>
          Uncomment this, then switch out App for AppPreload in index.tsx and run the app in your web browser.
        </p>
        <p>
          This code will grab the HTML DOM element for the React app and dump it&apos;s HTML in your browser console
          - effectively the same output as the jest snaphost.
        </p>
        <p>
          Beneath that, the stylesheet code enumerates the CSS stylesheets loaded in the page and dumps their CSS
          rules in the console as well, again similar to the Jest approach.
        </p>
        <p>
          The drawback here is that it&apos;s a little more work to get this setup and rendering (you have to manually switch
          App to AppPreload while running the app locally), and the CSS isn&apos;t tree
          shaked like the Jest version (so unused rulesets). Along with that, if you need/have additional CSS links
          in your static HTML, these will also be enumerated and included in the output without some filtering
          added to the code.
        </p>
        <p>
          With both approaches, because they&apos;re still run through CRA&apos;s build process before release, I don&apos;t
          care about all the white space which gets taken care of by that. You&apos;ll need to clone the repo locally and run
          the build to see that (or <a href="https://fsjsd.github.io/frontend-patterns/">view source</a> on the live site).
        </p>
        <h3>Summary</h3>
        <p>
          Having worked with both options, I find the Jest approach easier to manage.
        </p>
        <p>
          My initial payload is just 1.6kb of HTML and CSS and it scores 100% on Lighthouse.
        </p>
        <p>
          If you&apos;re building an React app without SSR, this technique is an easy, maintainable way to improve your
          user&apos;s first time use experience.
        </p>
      </div>
    </ContentContainer>
  </>
  )
}

export default PrplContainer;
