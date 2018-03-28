import React, { Component, Fragment } from "react";
import { compose, setDisplayName } from "recompose";
import { Link } from "react-router";
import { groupBy } from "lodash";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { workshop } from "fragments";

import { waitForData } from "enhancers";

//
// components
import { Button } from "components/uikit";
import { Tabs, Tab, Panel } from "components/uikit/tabs";

export class Dashboard extends Component {

  render() {
    const { adminStats: { users, teams }, workshops } = this.props.data;
    // const workshops = this.props.data.workshops.edges.map(e => e.node);

    return (
      <div className="AdminDashboard">
        <div className="content white">

          <Tabs>
            <Tab><span>Logistics</span></Tab>

            <Panel>
              <div className="Stats">
                <div className="section fullwidth">
                  <h2>Emails</h2>

                  <table className="stats">
                    <tbody>
                      <tr>
                        <td>Not applied yet</td>
                        <td><Button primary onClick={this.props.sendNotAppliedEmails}>Send email</Button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*
                <div className="section fullwidth">
                  <h2><Link to="/admin/checkin">Check In</Link></h2>

                  <table className="stats">
                    <tbody>
                      <tr>
                        <td>{users.checked_in}</td>
                        <td>Checked in participants</td>
                      </tr>
                      <tr>
                        <td>{users.total}</td>
                        <td>Total participants</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="section fullwidth">
                  <h2>Workshop Presences</h2>

                  <table className="stats">
                    <tbody>
                      {workshops.map(({ slug, name, attendances }) => (
                        <tr key={slug}>
                          <td>{attendances.filter(a => a.checkedIn).length} / {attendances.length}</td>
                          <td><Link to={`/admin/checkin/workshop/${slug}`}>{name}</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
                */}
              </div>
            </Panel>
          </Tabs>

          <Tabs>
            <Tab><span>Analytics</span></Tab>

            <Panel>
              <div className="Stats">

                <div className="section">
                  <h2><Link to="/admin/users">Users</Link></h2>

                  <table className="stats">
                    <tbody>
                      <tr>
                        <td>{users.hackathon}</td>
                        <td>hackathon participants</td>
                      </tr>
                      <tr>
                        <td>&ndash;</td>
                        <td>workshop participants</td>
                      </tr>
                      <tr>
                        <td>{users.total}</td>
                        <td>total participants</td>
                      </tr>
                      <tr>
                        <td>&ndash;</td>
                        <td>checked in users</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="section">
                  <h2><Link to="/admin/teams">Teams</Link></h2>

                  <table className="stats">
                    <tbody>
                      <tr>
                        <td>{teams.applied}</td>
                        <td>confirmed teams</td>
                      </tr>
                      <tr>
                        <td>{teams.total}</td>
                        <td>total teams</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="section">
                </div>


                <div className="section fullwidth">
                  <h2>
                    <Link to="/admin/workshops">Workshops</Link>
                  </h2>

                  <table className="stats">
                    <tbody>
                      {Object.entries(groupBy(workshops, "year")).map(([ year, workshops ]) => (
                        <Fragment key={year}>
                          <h2>{year}</h2>
                          {workshops.map(({ slug, name, attendances, participantLimit }) => (
                            <tr key={slug}>
                              <td>{attendances.length} / {participantLimit}</td>
                              <td><Link to={`/admin/workshops/${slug}`}>{name}</Link></td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </Panel>
          </Tabs>

        </div>
      </div>
    );
  }

}

export default compose(
  setDisplayName("Dashboard"),

  graphql(
    gql`mutation sendNotAppliedEmails {
      sendNotAppliedEmails
    }`,
    { name: "sendNotAppliedEmails" },
  ),

  graphql(gql`{
    adminStats {
      users
      roles
      teams
      workshops
    }

    workshops { ...workshop }
  } ${workshop}`),

  waitForData,
)(Dashboard);
