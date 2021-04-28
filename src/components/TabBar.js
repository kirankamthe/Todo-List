import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

function TabBar(props) {
  const handleTabSelect = (e) => {
    props.handleTabBarChange(e);
  };

  return (
    <Tabs
      defaultActiveKey="All"
      id="uncontrolled-tab-example"
      onSelect={handleTabSelect}
    >
      <Tab eventKey="All" title="All"></Tab>
      <Tab eventKey="Pending" title="Pending"></Tab>
      <Tab eventKey="Completed" title="Completed"></Tab>
    </Tabs>
  );
}

export default TabBar;
