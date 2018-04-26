import * as React from 'react';
import { ReactElement } from 'react';
import "./tabs.less";

interface TabInfo {
  key: string;
  title: string;
  onSelect: () => {};
}

export interface TabsState {
  selectedTab: string;
}
export class Tabs extends React.Component<any, TabsState> {
  constructor(props: any) {
    super(props);
    this.state = { selectedTab: null };
  }
  render() {
    let selectedTab = null;
    let defaultTab = null;
    const tabsInfo: TabInfo[] = [];
    React.Children.forEach(this.props.children, (child: ReactElement<any>) => {
      if (!child || !child.props) return;
      if (typeof child.props.title !== 'undefined') {
        tabsInfo.push({
          title: child.props.title as string,
          key: child.key.toString(),
          onSelect: child.props.onSelect
        });
        if (child.key.toString() === this.state.selectedTab) {
          selectedTab = child;
        }
        if (child.props.default === true) {
          defaultTab = child;
        }
      }
    });
    if (!selectedTab) {
      selectedTab = defaultTab;
    }
    return <div className='tabs'>
      <div className="tabs__tab-content">{selectedTab}</div>
      <ul className="tabs__navigation">
        {tabsInfo.map(t => {
          return (
            <li className="tabs-navigation__title" onClick={() => this.selectTab(t.key, t.onSelect)}>
              {t.title}
            </li>
          );
        })}
      </ul>
    </div>;
  }
  selectTab(key: string, onSelect: () => {}) {
    this.setState({ selectedTab: key });
    if (onSelect) {
      onSelect();
    }
  }
}
