import { useState, useMemo, useEffect } from 'react'
import './App.css'

// Cookie helper functions
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift())
  return ''
}

function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`
}

// DataGrid component to display JSON data as a table
function DataGrid({ data, maxColumns }) {
  if (!data || data.length === 0) {
    return <div className="grid-empty">No data to display</div>
  }

  // Get all unique keys from the data
  const allColumns = useMemo(() => {
    const keys = new Set()
    data.forEach(row => {
      if (row && typeof row === 'object') {
        Object.keys(row).forEach(key => keys.add(key))
      }
    })
    return Array.from(keys)
  }, [data])

  // Limit columns if maxColumns is specified
  const columns = maxColumns ? allColumns.slice(0, maxColumns) : allColumns

  return (
    <div className="grid-container">
      <table className="data-grid">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((col, colIdx) => (
                <td key={colIdx}>
                  {row && typeof row[col] === 'object' 
                    ? JSON.stringify(row[col]) 
                    : String(row[col] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const DEFAULT_JSON_DATA = `[
  {
    "studentId": "S001",
    "firstName": "Ava",
    "lastName": "Rodriguez",
    "gradeLevel": 7,
    "school": "Lincoln Middle School",
    "courseCode": "MATH7A",
    "courseName": "Grade 7 Mathematics",
    "classSection": "MATH7A-03",
    "teacherName": "Jordan Lee",
    "assessmentId": "MATH7A-U3-Q1",
    "assessmentName": "Unit 3: Proportional Relationships Quiz",
    "assessmentType": "Quiz",
    "assessmentCategory": "Formative",
    "dateAssigned": "2026-02-10",
    "dateCompleted": "2026-02-11",
    "completionStatus": "Completed",
    "attemptNumber": 1,
    "timeStarted": "2026-02-11T09:05:23Z",
    "timeFinished": "2026-02-11T09:21:18Z",
    "timeOnTaskSeconds": 955,
    "totalQuestions": 15,
    "questionsAttempted": 15,
    "questionsSkipped": 0,
    "questionsCorrect": 13,
    "questionsIncorrect": 2,
    "constructedResponseQuestions": 3,
    "constructedResponseAnswered": 3,
    "multipleChoiceQuestions": 12,
    "multipleChoiceCorrect": 10,
    "rawPointsEarned": 26,
    "rawPointsPossible": 30,
    "percentScore": 86.67,
    "scaledScore": 785,
    "proficiencyLevel": "Proficient",
    "standardsAligned": [
      "CCSS.MATH.CONTENT.7.RP.A.2",
      "CCSS.MATH.CONTENT.7.RP.A.3"
    ],
    "standardMastery": [
      {
        "standardId": "CCSS.MATH.CONTENT.7.RP.A.2",
        "itemsAligned": 9,
        "itemsCorrect": 8,
        "masteryPercent": 88.89,
        "masteryFlag": "On Track"
      },
      {
        "standardId": "CCSS.MATH.CONTENT.7.RP.A.3",
        "itemsAligned": 6,
        "itemsCorrect": 5,
        "masteryPercent": 83.33,
        "masteryFlag": "On Track"
      }
    ],
    "readingAccommodation": false,
    "calculatorAllowed": true,
    "accommodationsUsed": [],
    "lateSubmission": false,
    "absentCode": null,
    "retakeEligible": true,
    "feedbackProvided": true,
    "teacherComment": "Great work identifying proportional relationships. Review multi-step percent problems.",
    "parentVisible": true
  },
  {
    "studentId": "S002",
    "firstName": "Liam",
    "lastName": "Nguyen",
    "gradeLevel": 8,
    "school": "Lincoln Middle School",
    "courseCode": "SCI8B",
    "courseName": "Grade 8 Science",
    "classSection": "SCI8B-01",
    "teacherName": "Amira Patel",
    "assessmentId": "SCI8B-U4-TEST",
    "assessmentName": "Unit 4: Forces and Motion Test",
    "assessmentType": "Test",
    "assessmentCategory": "Summative",
    "dateAssigned": "2026-02-20",
    "dateCompleted": "2026-02-20",
    "completionStatus": "Completed",
    "attemptNumber": 1,
    "timeStarted": "2026-02-20T13:02:05Z",
    "timeFinished": "2026-02-20T13:58:40Z",
    "timeOnTaskSeconds": 3400,
    "totalQuestions": 30,
    "questionsAttempted": 30,
    "questionsSkipped": 0,
    "questionsCorrect": 22,
    "questionsIncorrect": 8,
    "constructedResponseQuestions": 5,
    "constructedResponseAnswered": 5,
    "multipleChoiceQuestions": 25,
    "multipleChoiceCorrect": 17,
    "rawPointsEarned": 44,
    "rawPointsPossible": 60,
    "percentScore": 73.33,
    "scaledScore": 710,
    "proficiencyLevel": "Basic",
    "standardsAligned": [
      "NGSS.MS.PS2.1",
      "NGSS.MS.PS2.2",
      "NGSS.MS.PS2.3"
    ],
    "standardMastery": [
      {
        "standardId": "NGSS.MS.PS2.1",
        "itemsAligned": 10,
        "itemsCorrect": 9,
        "masteryPercent": 90.0,
        "masteryFlag": "On Track"
      },
      {
        "standardId": "NGSS.MS.PS2.2",
        "itemsAligned": 10,
        "itemsCorrect": 7,
        "masteryPercent": 70.0,
        "masteryFlag": "Developing"
      },
      {
        "standardId": "NGSS.MS.PS2.3",
        "itemsAligned": 10,
        "itemsCorrect": 6,
        "masteryPercent": 60.0,
        "masteryFlag": "Below"
      }
    ],
    "readingAccommodation": true,
    "calculatorAllowed": false,
    "accommodationsUsed": ["Read-aloud"],
    "lateSubmission": false,
    "absentCode": null,
    "retakeEligible": true,
    "feedbackProvided": true,
    "teacherComment": "Strong understanding of Newton's Laws; needs more practice interpreting motion graphs.",
    "parentVisible": true
  },
  {
    "studentId": "S003",
    "firstName": "Noah",
    "lastName": "Johnson",
    "gradeLevel": 6,
    "school": "Riverside Intermediate",
    "courseCode": "ELA6C",
    "courseName": "Grade 6 English Language Arts",
    "classSection": "ELA6C-02",
    "teacherName": "Michelle Brown",
    "assessmentId": "ELA6C-BENCH-2",
    "assessmentName": "Benchmark 2: Reading Comprehension",
    "assessmentType": "Benchmark",
    "assessmentCategory": "Diagnostic",
    "dateAssigned": "2026-01-30",
    "dateCompleted": "2026-02-01",
    "completionStatus": "Completed",
    "attemptNumber": 1,
    "timeStarted": "2026-02-01T10:30:10Z",
    "timeFinished": "2026-02-01T11:05:45Z",
    "timeOnTaskSeconds": 2135,
    "totalQuestions": 28,
    "questionsAttempted": 28,
    "questionsSkipped": 0,
    "questionsCorrect": 18,
    "questionsIncorrect": 10,
    "constructedResponseQuestions": 4,
    "constructedResponseAnswered": 4,
    "multipleChoiceQuestions": 24,
    "multipleChoiceCorrect": 14,
    "rawPointsEarned": 36,
    "rawPointsPossible": 56,
    "percentScore": 64.29,
    "scaledScore": 690,
    "proficiencyLevel": "Below Basic",
    "standardsAligned": [
      "CCSS.ELA-LITERACY.RL.6.1",
      "CCSS.ELA-LITERACY.RL.6.2",
      "CCSS.ELA-LITERACY.RI.6.1"
    ],
    "standardMastery": [
      {
        "standardId": "CCSS.ELA-LITERACY.RL.6.1",
        "itemsAligned": 10,
        "itemsCorrect": 7,
        "masteryPercent": 70.0,
        "masteryFlag": "Developing"
      },
      {
        "standardId": "CCSS.ELA-LITERACY.RL.6.2",
        "itemsAligned": 8,
        "itemsCorrect": 4,
        "masteryPercent": 50.0,
        "masteryFlag": "Below"
      },
      {
        "standardId": "CCSS.ELA-LITERACY.RI.6.1",
        "itemsAligned": 10,
        "itemsCorrect": 7,
        "masteryPercent": 70.0,
        "masteryFlag": "Developing"
      }
    ],
    "readingAccommodation": false,
    "calculatorAllowed": false,
    "accommodationsUsed": [],
    "lateSubmission": true,
    "absentCode": "EXCUSED",
    "retakeEligible": false,
    "feedbackProvided": true,
    "teacherComment": "Focus next on determining theme and supporting it with text evidence.",
    "parentVisible": true
  },
  {
    "studentId": "S004",
    "firstName": "Emma",
    "lastName": "Garcia",
    "gradeLevel": 7,
    "school": "Riverside Intermediate",
    "courseCode": "MATH7A",
    "courseName": "Grade 7 Mathematics",
    "classSection": "MATH7A-01",
    "teacherName": "Jordan Lee",
    "assessmentId": "MATH7A-U3-Q1",
    "assessmentName": "Unit 3: Proportional Relationships Quiz",
    "assessmentType": "Quiz",
    "assessmentCategory": "Formative",
    "dateAssigned": "2026-02-10",
    "dateCompleted": "2026-02-10",
    "completionStatus": "Completed",
    "attemptNumber": 2,
    "timeStarted": "2026-02-10T08:10:05Z",
    "timeFinished": "2026-02-10T08:24:50Z",
    "timeOnTaskSeconds": 885,
    "totalQuestions": 15,
    "questionsAttempted": 15,
    "questionsSkipped": 0,
    "questionsCorrect": 15,
    "questionsIncorrect": 0,
    "constructedResponseQuestions": 3,
    "constructedResponseAnswered": 3,
    "multipleChoiceQuestions": 12,
    "multipleChoiceCorrect": 12,
    "rawPointsEarned": 30,
    "rawPointsPossible": 30,
    "percentScore": 100.0,
    "scaledScore": 820,
    "proficiencyLevel": "Advanced",
    "standardsAligned": [
      "CCSS.MATH.CONTENT.7.RP.A.2",
      "CCSS.MATH.CONTENT.7.RP.A.3"
    ],
    "standardMastery": [
      {
        "standardId": "CCSS.MATH.CONTENT.7.RP.A.2",
        "itemsAligned": 9,
        "itemsCorrect": 9,
        "masteryPercent": 100.0,
        "masteryFlag": "Mastered"
      },
      {
        "standardId": "CCSS.MATH.CONTENT.7.RP.A.3",
        "itemsAligned": 6,
        "itemsCorrect": 6,
        "masteryPercent": 100.0,
        "masteryFlag": "Mastered"
      }
    ],
    "readingAccommodation": false,
    "calculatorAllowed": true,
    "accommodationsUsed": [],
    "lateSubmission": false,
    "absentCode": null,
    "retakeEligible": false,
    "feedbackProvided": true,
    "teacherComment": "Perfect score on retake. Ready for enrichment tasks.",
    "parentVisible": true
  },
  {
    "studentId": "S005",
    "firstName": "Isabella",
    "lastName": "Martinez",
    "gradeLevel": 8,
    "school": "Lincoln Middle School",
    "courseCode": "SS8A",
    "courseName": "Grade 8 Social Studies",
    "classSection": "SS8A-01",
    "teacherName": "Daniel White",
    "assessmentId": "SS8A-U5-PROJ",
    "assessmentName": "Unit 5: Civic Participation Project",
    "assessmentType": "Project",
    "assessmentCategory": "Summative",
    "dateAssigned": "2026-01-15",
    "dateCompleted": "2026-02-05",
    "completionStatus": "Completed",
    "attemptNumber": 1,
    "timeStarted": "2026-02-05T14:10:00Z",
    "timeFinished": "2026-02-05T14:45:00Z",
    "timeOnTaskSeconds": 2100,
    "totalQuestions": 10,
    "questionsAttempted": 10,
    "questionsSkipped": 0,
    "questionsCorrect": 9,
    "questionsIncorrect": 1,
    "constructedResponseQuestions": 6,
    "constructedResponseAnswered": 6,
    "multipleChoiceQuestions": 4,
    "multipleChoiceCorrect": 3,
    "rawPointsEarned": 45,
    "rawPointsPossible": 50,
    "percentScore": 90.0,
    "scaledScore": 800,
    "proficiencyLevel": "Proficient",
    "standardsAligned": [
      "NCSS.D2.Civ.2.6-8",
      "NCSS.D2.Civ.10.6-8"
    ],
    "standardMastery": [
      {
        "standardId": "NCSS.D2.Civ.2.6-8",
        "itemsAligned": 6,
        "itemsCorrect": 6,
        "masteryPercent": 100.0,
        "masteryFlag": "Mastered"
      },
      {
        "standardId": "NCSS.D2.Civ.10.6-8",
        "itemsAligned": 4,
        "itemsCorrect": 3,
        "masteryPercent": 75.0,
        "masteryFlag": "On Track"
      }
    ],
    "readingAccommodation": false,
    "calculatorAllowed": false,
    "accommodationsUsed": [],
    "lateSubmission": false,
    "absentCode": null,
    "retakeEligible": false,
    "feedbackProvided": true,
    "teacherComment": "Excellent project with strong community connection and clear presentation.",
    "parentVisible": true
  },
  {
    "studentId": "S006",
    "firstName": "Mason",
    "lastName": "Wilson",
    "gradeLevel": 6,
    "school": "Riverside Intermediate",
    "courseCode": "SCI6A",
    "courseName": "Grade 6 Science",
    "classSection": "SCI6A-03",
    "teacherName": "Harper Kim",
    "assessmentId": "SCI6A-U2-Q2",
    "assessmentName": "Unit 2: Ecosystems Quiz",
    "assessmentType": "Quiz",
    "assessmentCategory": "Formative",
    "dateAssigned": "2026-02-03",
    "dateCompleted": "2026-02-04",
    "completionStatus": "Completed",
    "attemptNumber": 1,
    "timeStarted": "2026-02-04T09:55:12Z",
    "timeFinished": "2026-02-04T10:09:30Z",
    "timeOnTaskSeconds": 858,
    "totalQuestions": 12,
    "questionsAttempted": 12,
    "questionsSkipped": 0,
    "questionsCorrect": 7,
    "questionsIncorrect": 5,
    "constructedResponseQuestions": 2,
    "constructedResponseAnswered": 2,
    "multipleChoiceQuestions": 10,
    "multipleChoiceCorrect": 5,
    "rawPointsEarned": 19,
    "rawPointsPossible": 30,
    "percentScore": 63.33,
    "scaledScore": 675,
    "proficiencyLevel": "Below Basic",
    "standardsAligned": [
      "NGSS.MS.LS2.1",
      "NGSS.MS.LS2.2"
    ],
    "standardMastery": [
      {
        "standardId": "NGSS.MS.LS2.1",
        "itemsAligned": 6,
        "itemsCorrect": 3,
        "masteryPercent": 50.0,
        "masteryFlag": "Below"
      },
      {
        "standardId": "NGSS.MS.LS2.2",
        "itemsAligned": 6,
        "itemsCorrect": 4,
        "masteryPercent": 66.67,
        "masteryFlag": "Developing"
      }
    ],
    "readingAccommodation": true,
    "calculatorAllowed": false,
    "accommodationsUsed": ["Small group setting"],
    "lateSubmission": false,
    "absentCode": null,
    "retakeEligible": true,
    "feedbackProvided": true,
    "teacherComment": "Revisit food webs and energy transfer; schedule a small-group review.",
    "parentVisible": true
  },
  {
    "studentId": "S007",
    "firstName": "Sophia",
    "lastName": "Thomas",
    "gradeLevel": 7,
    "school": "Lincoln Middle School",
    "courseCode": "ELA7B",
    "courseName": "Grade 7 English Language Arts",
    "classSection": "ELA7B-01",
    "teacherName": "Michelle Brown",
    "assessmentId": "ELA7B-WRIT-ARG1",
    "assessmentName": "Argumentative Writing Task 1",
    "assessmentType": "Writing",
    "assessmentCategory": "Summative",
    "dateAssigned": "2026-02-01",
    "dateCompleted": "2026-02-07",
    "completionStatus": "Completed",
    "attemptNumber": 1,
    "timeStarted": "2026-02-07T12:10:00Z",
    "timeFinished": "2026-02-07T12:55:30Z",
    "timeOnTaskSeconds": 2730,
    "totalQuestions": 1,
    "questionsAttempted": 1,
    "questionsSkipped": 0,
    "questionsCorrect": 1,
    "questionsIncorrect": 0,
    "constructedResponseQuestions": 1,
    "constructedResponseAnswered": 1,
    "multipleChoiceQuestions": 0,
    "multipleChoiceCorrect": 0,
    "rawPointsEarned": 18,
    "rawPointsPossible": 20,
    "percentScore": 90.0,
    "scaledScore": 795,
    "proficiencyLevel": "Proficient",
    "standardsAligned": [
      "CCSS.ELA-LITERACY.W.7.1",
      "CCSS.ELA-LITERACY.W.7.4"
    ],
    "standardMastery": [
      {
        "standardId": "CCSS.ELA-LITERACY.W.7.1",
        "itemsAligned": 12,
        "itemsCorrect": 11,
        "masteryPercent": 91.67,
        "masteryFlag": "On Track"
      },
      {
        "standardId": "CCSS.ELA-LITERACY.W.7.4",
        "itemsAligned": 8,
        "itemsCorrect": 7,
        "masteryPercent": 87.5,
        "masteryFlag": "On Track"
      }
    ],
    "readingAccommodation": false,
    "calculatorAllowed": false,
    "accommodationsUsed": [],
    "lateSubmission": false,
    "absentCode": null,
    "retakeEligible": false,
    "feedbackProvided": true,
    "teacherComment": "Strong claim and evidence; work on smoother transitions between paragraphs.",
    "parentVisible": true
  },
  {
    "studentId": "S008",
    "firstName": "James",
    "lastName": "Hernandez",
    "gradeLevel": 8,
    "school": "Lincoln Middle School",
    "courseCode": "MATH8A",
    "courseName": "Grade 8 Mathematics",
    "classSection": "MATH8A-02",
    "teacherName": "Jordan Lee",
    "assessmentId": "MATH8A-BENCH-2",
    "assessmentName": "Benchmark 2: Linear Functions",
    "assessmentType": "Benchmark",
    "assessmentCategory": "Diagnostic",
    "dateAssigned": "2026-02-08",
    "dateCompleted": "2026-02-08",
    "completionStatus": "Completed",
    "attemptNumber": 1,
    "timeStarted": "2026-02-08T11:00:20Z",
    "timeFinished": "2026-02-08T11:35:40Z",
    "timeOnTaskSeconds": 2120,
    "totalQuestions": 25,
    "questionsAttempted": 25,
    "questionsSkipped": 0,
    "questionsCorrect": 16,
    "questionsIncorrect": 9,
    "constructedResponseQuestions": 5,
    "constructedResponseAnswered": 5,
    "multipleChoiceQuestions": 20,
    "multipleChoiceCorrect": 11,
    "rawPointsEarned": 32,
    "rawPointsPossible": 50,
    "percentScore": 64.0,
    "scaledScore": 700,
    "proficiencyLevel": "Basic",
    "standardsAligned": [
      "CCSS.MATH.CONTENT.8.F.1",
      "CCSS.MATH.CONTENT.8.F.3"
    ],
    "standardMastery": [
      {
        "standardId": "CCSS.MATH.CONTENT.8.F.1",
        "itemsAligned": 12,
        "itemsCorrect": 9,
        "masteryPercent": 75.0,
        "masteryFlag": "Developing"
      },
      {
        "standardId": "CCSS.MATH.CONTENT.8.F.3",
        "itemsAligned": 13,
        "itemsCorrect": 7,
        "masteryPercent": 53.85,
        "masteryFlag": "Below"
      }
    ],
    "readingAccommodation": false,
    "calculatorAllowed": true,
    "accommodationsUsed": [],
    "lateSubmission": false,
    "absentCode": null,
    "retakeEligible": true,
    "feedbackProvided": true,
    "teacherComment": "Understands function representations; needs practice converting between forms.",
    "parentVisible": true
  },
  {
    "studentId": "S009",
    "firstName": "Mia",
    "lastName": "Lopez",
    "gradeLevel": 6,
    "school": "Riverside Intermediate",
    "courseCode": "MATH6B",
    "courseName": "Grade 6 Mathematics",
    "classSection": "MATH6B-01",
    "teacherName": "Alex Rivera",
    "assessmentId": "MATH6B-U1-EXIT",
    "assessmentName": "Unit 1: Ratios Exit Ticket",
    "assessmentType": "Exit Ticket",
    "assessmentCategory": "Formative",
    "dateAssigned": "2026-01-18",
    "dateCompleted": "2026-01-18",
    "completionStatus": "Completed",
    "attemptNumber": 1,
    "timeStarted": "2026-01-18T14:05:00Z",
    "timeFinished": "2026-01-18T14:12:10Z",
    "timeOnTaskSeconds": 430,
    "totalQuestions": 5,
    "questionsAttempted": 5,
    "questionsSkipped": 0,
    "questionsCorrect": 4,
    "questionsIncorrect": 1,
    "constructedResponseQuestions": 1,
    "constructedResponseAnswered": 1,
    "multipleChoiceQuestions": 4,
    "multipleChoiceCorrect": 3,
    "rawPointsEarned": 9,
    "rawPointsPossible": 10,
    "percentScore": 90.0,
    "scaledScore": 810,
    "proficiencyLevel": "Proficient",
    "standardsAligned": [
      "CCSS.MATH.CONTENT.6.RP.A.1"
    ],
    "standardMastery": [
      {
        "standardId": "CCSS.MATH.CONTENT.6.RP.A.1",
        "itemsAligned": 5,
        "itemsCorrect": 4,
        "masteryPercent": 80.0,
        "masteryFlag": "On Track"
      }
    ],
    "readingAccommodation": false,
    "calculatorAllowed": false,
    "accommodationsUsed": [],
    "lateSubmission": false,
    "absentCode": null,
    "retakeEligible": false,
    "feedbackProvided": true,
    "teacherComment": "Ready to move to more complex ratio word problems.",
    "parentVisible": true
  },
  {
    "studentId": "S010",
    "firstName": "Elijah",
    "lastName": "Davis",
    "gradeLevel": 8,
    "school": "Lincoln Middle School",
    "courseCode": "ELA8A",
    "courseName": "Grade 8 English Language Arts",
    "classSection": "ELA8A-02",
    "teacherName": "Riley Morgan",
    "assessmentId": "ELA8A-U3-QUIZ",
    "assessmentName": "Unit 3: Informational Text Quiz",
    "assessmentType": "Quiz",
    "assessmentCategory": "Formative",
    "dateAssigned": "2026-02-12",
    "dateCompleted": null,
    "completionStatus": "In Progress",
    "attemptNumber": 1,
    "timeStarted": "2026-02-13T10:00:00Z",
    "timeFinished": null,
    "timeOnTaskSeconds": 540,
    "totalQuestions": 12,
    "questionsAttempted": 6,
    "questionsSkipped": 6,
    "questionsCorrect": 3,
    "questionsIncorrect": 3,
    "constructedResponseQuestions": 2,
    "constructedResponseAnswered": 1,
    "multipleChoiceQuestions": 10,
    "multipleChoiceCorrect": 2,
    "rawPointsEarned": 7,
    "rawPointsPossible": 24,
    "percentScore": 29.17,
    "scaledScore": 640,
    "proficiencyLevel": "Not Yet Scored",
    "standardsAligned": [
      "CCSS.ELA-LITERACY.RI.8.1",
      "CCSS.ELA-LITERACY.RI.8.2"
    ],
    "standardMastery": [
      {
        "standardId": "CCSS.ELA-LITERACY.RI.8.1",
        "itemsAligned": 6,
        "itemsCorrect": 3,
        "masteryPercent": 50.0,
        "masteryFlag": "Below"
      },
      {
        "standardId": "CCSS.ELA-LITERACY.RI.8.2",
        "itemsAligned": 6,
        "itemsCorrect": 4,
        "masteryPercent": 66.67,
        "masteryFlag": "Developing"
      }
    ],
    "readingAccommodation": true,
    "calculatorAllowed": false,
    "accommodationsUsed": ["Extended time"],
    "lateSubmission": false,
    "absentCode": null,
    "retakeEligible": false,
    "feedbackProvided": false,
    "teacherComment": null,
    "parentVisible": false
  }
]`

// Default to same-origin API path so Vercel can proxy requests server-side.
const DEFAULT_API_URL = '/api/reports'

const normalizeApiUrl = (url) => {
  const trimmed = (url || '').trim()

  if (!trimmed) {
    return DEFAULT_API_URL
  }

  // Keep existing full Harris API URLs working by converting to relative /api path.
  if (trimmed.startsWith('https://ai-api.harriscomputer.io')) {
    return trimmed.replace('https://ai-api.harriscomputer.io', '')
  }

  return trimmed
}

function App() {
  // Top section state
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL)
  const [apiKey, setApiKey] = useState(() => getCookie('apiKey'))
  const [showApiKey, setShowApiKey] = useState(false)

  // Save API key to cookie when it changes
  useEffect(() => {
    setCookie('apiKey', apiKey)
  }, [apiKey])

  // Middle section state
  const [jsonData, setJsonData] = useState(DEFAULT_JSON_DATA)
  const [idField, setIdField] = useState('studentId')
  const [reportKey, setReportKey] = useState('')
  const [isSubmitting1, setIsSubmitting1] = useState(false)
  const [activeTab, setActiveTab] = useState('json')

  // Parse JSON data for grid display
  const parsedData = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonData)
      return Array.isArray(parsed) ? parsed : [parsed]
    } catch {
      return []
    }
  }, [jsonData])

  // Bottom section state
  const [question, setQuestion] = useState('')
  const [results, setResults] = useState('')
  const [parsedResults, setParsedResults] = useState({ summary: '', matchingIdentifiers: [] })
  const [isSubmitting2, setIsSubmitting2] = useState(false)
  const [resultsTab, setResultsTab] = useState('visual')

  // Get matching rows from parsedData based on matchingIdentifiers
  const matchingRows = useMemo(() => {
    if (!parsedResults.matchingIdentifiers || parsedResults.matchingIdentifiers.length === 0) {
      return []
    }
    return parsedData.filter(row => 
      parsedResults.matchingIdentifiers.includes(row[idField])
    )
  }, [parsedData, parsedResults.matchingIdentifiers, idField])

  // Button2 is enabled when reportKey and question have values
  const isButton2Enabled = reportKey.trim() !== '' && question.trim() !== ''

  // Handle Button1 submit - Create report
  const handleSubmit1 = async () => {
    setIsSubmitting1(true)
    try {
      // Parse the JSON from the text area
      let dataArray
      try {
        dataArray = JSON.parse(jsonData)
        // Ensure it's an array
        if (!Array.isArray(dataArray)) {
          dataArray = [dataArray]
        }
      } catch {
        alert('Invalid JSON in the JSON field')
        setIsSubmitting1(false)
        return
      }

      const requestBody = {
        data: dataArray,
        uniqueIdentifier: idField
      }

      const response = await fetch(normalizeApiUrl(apiUrl), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      
      // Set the reportId to TextField4 (Report Key)
      if (result.reportId) {
        setReportKey(result.reportId)
      }
    } catch (error) {
      alert(`Error: ${error.message}`)
    } finally {
      setIsSubmitting1(false)
    }
  }

  // Handle Button2 submit - Query report
  const handleSubmit2 = async () => {
    setIsSubmitting2(true)
    try {
      const baseUrl = normalizeApiUrl(apiUrl).replace(/\/$/, '')
      const queryUrl = `${baseUrl}/${encodeURIComponent(reportKey)}/query`
      
      const requestBody = {
        prompt: question
      }

      const response = await fetch(queryUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      
      // Store raw JSON results
      setResults(typeof result === 'string' ? result : JSON.stringify(result, null, 2))
      
      // Parse structured results for visual display
      if (result && typeof result === 'object') {
        setParsedResults({
          summary: result.summary || '',
          matchingIdentifiers: result.matchingIdentifiers || []
        })
      } else {
        setParsedResults({ summary: '', matchingIdentifiers: [] })
      }
    } catch (error) {
      setResults(`Error: ${error.message}`)
      setParsedResults({ summary: '', matchingIdentifiers: [] })
    } finally {
      setIsSubmitting2(false)
    }
  }

  return (
    <div className="app-container">
      <h1>Report Helper</h1>
      
      {/* Top Section */}
      <div className="section">
        <div className="field-group">
          <label htmlFor="apiUrl">API URL</label>
          <input
            type="text"
            id="apiUrl"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="text-field"
          />
        </div>
        
        <div className="field-group">
          <label htmlFor="apiKey">API Key</label>
          <div className="password-field-container">
            <input
              type={showApiKey ? 'text' : 'password'}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="text-field password-field"
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowApiKey(!showApiKey)}
              aria-label={showApiKey ? 'Hide API Key' : 'Show API Key'}
            >
              {showApiKey ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="section">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            JSON
          </button>
          <button
            className={`tab-button ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            Report
          </button>
          <button
            className={`tab-button ${activeTab === 'query' ? 'active' : ''}`}
            onClick={() => setActiveTab('query')}
          >
            Query
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'json' && (
            <div className="field-group">
              <label htmlFor="jsonData">JSON</label>
              <textarea
                id="jsonData"
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                className="multiline-field multiline-20"
                placeholder='[{"field1": "value1", "field2": "value2"}]'
              />
            </div>
          )}

          {activeTab === 'report' && (
            <div className="field-group">
              <label>Report Preview (First 3 Columns)</label>
              <DataGrid data={parsedData} maxColumns={3} />
            </div>
          )}

          {activeTab === 'query' && (
            <div className="field-group">
              <label>Query Data (All Columns)</label>
              <DataGrid data={parsedData} maxColumns={null} />
            </div>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="idField">ID Field</label>
          <input
            type="text"
            id="idField"
            value={idField}
            onChange={(e) => setIdField(e.target.value)}
            className="text-field"
          />
        </div>

        <button
          className="submit-button"
          onClick={handleSubmit1}
          disabled={isSubmitting1}
        >
          {isSubmitting1 ? 'Submitting...' : 'Submit'}
        </button>

        <div className="field-group">
          <label htmlFor="reportKey">Report Key</label>
          <input
            type="text"
            id="reportKey"
            value={reportKey}
            onChange={(e) => setReportKey(e.target.value)}
            className="text-field"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="section">
        <div className="field-group">
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="multiline-field multiline-3"
            placeholder="Enter your question here..."
          />
        </div>

        <button
          className="submit-button"
          onClick={handleSubmit2}
          disabled={!isButton2Enabled || isSubmitting2}
        >
          {isSubmitting2 ? 'Submitting...' : 'Submit'}
        </button>

        {/* Results Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${resultsTab === 'visual' ? 'active' : ''}`}
            onClick={() => setResultsTab('visual')}
          >
            Visual
          </button>
          <button
            className={`tab-button ${resultsTab === 'json' ? 'active' : ''}`}
            onClick={() => setResultsTab('json')}
          >
            JSON
          </button>
        </div>

        {/* Results Tab Content */}
        <div className="tab-content results-tab-content">
          {resultsTab === 'json' && (
            <div className="field-group">
              <label htmlFor="results">Raw JSON</label>
              <textarea
                id="results"
                value={results}
                readOnly
                className="multiline-field multiline-10"
                placeholder="Results will appear here..."
              />
            </div>
          )}

          {resultsTab === 'visual' && (
            <>
              <div className="field-group">
                <label htmlFor="summary">Summary</label>
                <textarea
                  id="summary"
                  value={parsedResults.summary}
                  readOnly
                  className="multiline-field multiline-3"
                  placeholder="Summary will appear here..."
                />
              </div>

              <div className="field-group">
                <label>Matching Records ({matchingRows.length})</label>
                <DataGrid data={matchingRows} maxColumns={null} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
