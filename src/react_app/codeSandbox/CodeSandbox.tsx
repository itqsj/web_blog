import React, { FC, ReactElement } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import './css/codeSandbox.less';

interface PropsInt {
  isdark: boolean;
}

const CodeSandbox: FC<PropsInt> = ({ isdark }) => {
  return (
    <Sandpack
      template="react"
      theme={isdark ? 'dark' : 'light'}
      options={{
        showTabs: true,
        closableTabs: true,
        showNavigator: true,
        showConsole: true,
        editorHeight: '100%',
        externalResources: [], //依赖
      }}
      files={{
        '/App.js': `export default function App() {
  return (
    <div className="App">
      <h1>Hello world ✨</h1>
      <p>Start editing to see some magic happen!</p>
    </div>
  )
}`,
      }}
    />
  ) as ReactElement;
};

export default CodeSandbox;
