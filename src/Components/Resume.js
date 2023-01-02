import React, { Component } from "react";
import Slide from "react-reveal";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { borderRight } from "@mui/system";
import { yellow } from "@mui/material/colors";

class Resume extends Component {
  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.props.data) return null;

    const skillmessage = this.props.data.skillmessage;
    const education = this.props.data.education.map(function (education) {
      return (
        
        <div key={education.school}>
          
          <h3>{education.school}</h3>
          <p className="info">{education.degree}</p>
          <p className="info">{education.graduated}</p>
          <p className="info">{education.description}</p>
          
        </div>
      );
    });

    const work = this.props.data.work.map(function (work) {
      return (
        <div key={work.company}>
          <div className="three columns" style={{marginRight: "-50px"}}>
              <img
                className="profile-pic company-logo"
                src={"images/logo/"+work.logo}
                alt="Nordic Giant Profile Pic"
              />
            </div>
          <h3>{work.company}</h3>
          <p className="info">{work.title}</p>
          <em className="date">{work.years}</em>
          <h5 style={{textDecoration: "underline"}}>Roles & Responsibilities</h5>
          <ul style={{listStyleType: "square", marginLeft: "40px"}}>
            {work.description.map((desc) => {
              return (<li>{desc}</li>)
            })}
          </ul>
        </div>
      );
    });

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 18
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        border: -100
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 5,
      },
    }));

    const skills = () =>  {
      var skillData = this.props.data.skills

      return (
        <TableContainer>
          {skillData.map((skill) => {
            return (
            <Table sx={{ minWidth: 500 }} aria-label="customized table" style={{display: "inline"}}>
              <TableHead>
                <TableRow>
                <StyledTableCell align="center">{skill.sectionName}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  skill.skillSet.map((sk, id) => {
                    return(
                      <StyledTableRow key={id}>
                        <StyledTableCell align="center" style={{borderBlock: "10px"}}>{sk}</StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
            )
          })}
        </TableContainer>
      );

          
    };

    return (
      <section id="resume">
        <Slide left duration={1300}>
          <div className="row work">
            <div className="three columns header-col">
              <h1>
                <span>Work</span>
              </h1>
            </div>

            <div className="nine columns main-col">{work}</div>
          </div>
        </Slide>

        <Slide left duration={1300}>
          <div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>Education</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{education}</div>
              </div>
            </div>
          </div>
        </Slide>

        <Slide right duration={1300}>
          <div className="row">
            <div className="twelve columns header-col">
              <h1>
                <span>Skills</span>
              </h1>
            </div>

            <div className="ten columns main-col" style={{marginTop: "-30px"}}>
              <div className="row item">
                  <div className="twelve columns" style={{width: "2000px"}}>
                    {skills()}
                  </div>
              </div>
            </div>
          </div>
        </Slide>
      </section>
    );
  }
}

export default Resume;
