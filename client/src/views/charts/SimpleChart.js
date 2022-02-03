import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
} from '@coreui/react-chartjs'
// import { DocsLink } from 'src/reusable'

const SimpleChart = () => {

  return (
    <CCardGroup columns className="cols-2" >

      <CCard>
        <h3 className="m-2">Daily Approved-Reject-Hold Summary</h3>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: 'TOTAL UPLOADED POSTS',
                backgroundColor: 'rgb(228,102,81,0.9)',
                data: [0, 1000, 2005, 2005, 4000, 5000, 6000, 7000]
              },
              {
                label: 'APPROVED',
                backgroundColor: 'rgb(0,216,255,0.9)',
                data: [1000, 2005, 1500, 4000, 5000, 6000, 7000]
              },
              {
                label: 'REJECTED',
                backgroundColor: 'rgb(228,102,81,0.9)',
                data: [1000, 2005, 1800, 4000, 5000, 6000, 7000]
              },
              {
                label: 'ON HOLD',
                backgroundColor: 'rgb(0,216,255,0.9)',
                data: [0, 1000, 2005, 2005, 4000, 5000, 6000, 7000]
              }
            ]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels={["04-02-2021", "05-02-2021", "06-02-2021", "07-02-2021", "08-02-2021"]}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <h3 className="m-2">Moderator-Wise Report</h3>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'Moderator 1',
                backgroundColor: '#f87979',
                data: [0, 2, 6, 3, 7, 5]
              },
              {
                label: 'Moderator 2',
                backgroundColor: '#f63267',
                data: [2, 2, 5, 3, 6, 3]
              },
              {
                label: 'Moderator 3',
                backgroundColor: '#f87979',
                data: [4, 2, 4, 3, 8, 3]
              }
            ]}
            labels={["04-02-2021", "05-02-2021", "06-02-2021", "07-02-2021", "08-02-2021"]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>



      <CCard>
        <h3 className="m-2">This Week’s Data</h3>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]}
            labels={['Total Posts', 'Approved', 'Rejected', 'On Hold']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
  )
}

export default SimpleChart
