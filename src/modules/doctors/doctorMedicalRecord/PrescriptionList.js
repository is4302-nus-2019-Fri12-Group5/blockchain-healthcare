// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import Button from '../../../ui/button'
import Icon from '../../../ui/icon'
import H4 from '../../../ui/typography/H4'
import { Input, Textarea } from '../../../ui/input'
import {black, white} from "../../../ui/common/colors"

// App Imports
import doctorsRoutes from '../../../setup/routes/doctors'
import { slug } from '../../../setup/helpers'
import {
    createOrUpdate as crateCreateOrUpdate,
    getById as getCrateById
} from '../../crate/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import EmptyMessage from '../../common/EmptyMessage'

// Component
class PrescriptionList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            prescriptions: [],
            medicalRecord: ''
        }
    }

    componentDidMount() {
        fetch(`/doctor/api/org.healthcare.MedicalRecord/${this.props.match.params.id}`)
	    .then(response => response.json())
        .then(responseData => {
          this.setState({
            medicalRecord: responseData
          });

          this.updatePrescriptionList();
          console.log(responseData);

        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    }

    updatePrescriptionList = async () => {

        await this.setState({
            prescriptions: this.state.medicalRecord.prescriptions
        })

        console.log(this.state.prescriptions)
    };

    render() {

        const { prescriptions, isLoading } = this.state;
        
        return (
            <div>
                {/* SEO */}
                <Helmet>
                    <title>Prescription - MediChain</title>
                </Helmet>

                {/* Top menu bar */}
                {/* <DoctorMenu/> */}

                {/* Page Content */}


                <div>
                    {/* Top actions bar */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell style={{ textAlign: 'left' }}>
                            <Link to={doctorsRoutes.doctorPrescription.path(this.props.match.params.id)}>
                                <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
                            </Link>
                        </GridCell>

                        <GridCell style={{ textAlign: 'right' }}>
                            <Link to={doctorsRoutes.doctorCreatePrescription.path}>
                                <Button theme="secondary" style={{ marginTop: '1em' }}>
                                    <Icon size={1.2} style={{ color: white }}>add</Icon> Add
                                </Button>
                            </Link>
                        </GridCell>
                    </Grid>

                {/*}*/}
                    {/* Prescription list */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell>
                            <H4 font="secondary" style={{ marginBottom: '1em', textAlign: 'center' }}>
                                Prescription of Medical Record {this.props.match.params.id}
                            </H4>

                            <table className="striped">
                                <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Pres ID</th>
                                    <th style={{ textAlign: 'center' }}>Drug Name</th>
                                    <th style={{ textAlign: 'center' }}>Quantity</th>
                                    <th style={{ textAlign: 'center' }}>Unit Type</th>
                                    <th style={{ textAlign: 'center' }}>Dosage</th>
                                    <th style={{ textAlign: 'center' }}>Duration</th>
                                    <th style={{ textAlign: 'center' }}>Last Modified</th>
                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {/* Mock data */}
                                <tr>
                                    <td style={{ textAlign: 'center' }}>GX04001 </td>
                                    <td style={{ textAlign: 'center' }}>Vitamin c </td>
                                    <td style={{ textAlign: 'center' }}>2</td>
                                    <td style={{ textAlign: 'center' }}>tablet</td>
                                    <td style={{ textAlign: 'center' }}>/</td>
                                    <td style={{ textAlign: 'center' }}>1 month</td>
                                    <td style={{ textAlign: 'center' }}>23/03/2017</td>
                                    <td style={{ textAlign: 'center' }}>
                                        {/*<Link to={doctorsRoute.recordEdit.path(medicalRecord.recordID)}>*/}
                                        <Link to={doctorsRoutes.doctorEditPrescription.path}>
                                            <Icon size={2} style={{ color: black }}>edit</Icon>
                                        </Link>
                                    </td>
                                </tr>

                                {/* Get data from backend */}
                                {
                                    prescriptions.length > 0
                                            ? prescriptions.map((singlePrescription) => (
                                            <tr key={singlePrescription.presID}>
                                                <td>
                                                    { singlePrescription.presID }
                                                </td>

                                                <td>
                                                    { singlePrescription.drugName }
                                                </td>

                                                <td>
                                                    { singlePrescription.quantity }
                                                </td>

                                                <td>
                                                    { singlePrescription.unitType }
                                                </td>

                                                <td>
                                                    { singlePrescription.dosage }
                                                </td>

                                                <td>
                                                    { singlePrescription.duration }
                                                </td>

                                                <td style={{ textAlign: 'center' }}>
                                                    {/* <Button type="button" theme="primary" style={{marginRight : '0.5em'}}
                                                            onClick={() => this.handlePayBill(singleRecord)}> Pay </Button> */}
                                                <Link to={doctorsRoutes.doctorEditPrescription.path(singlePrescription.presID)}>
                                                    <Icon size={2} style={{ color: black }}>edit</Icon>
                                                </Link>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="6">
                                                <EmptyMessage message="No prescription to show. The above is Mock Data."/>
                                            </td>
                                        </tr>
                                }

                                </tbody>
                            </table>
                        </GridCell>
                    </Grid>

                </div>
            </div>
        )
    }
}

// Component Properties
PrescriptionList.propTypes = {
    crateCreateOrUpdate: PropTypes.func.isRequired,
    getCrateById: PropTypes.func.isRequired,
    messageShow: PropTypes.func.isRequired,
    messageHide: PropTypes.func.isRequired
}

export default withRouter(connect(null, {
    crateCreateOrUpdate,
    getCrateById,
    messageShow,
    messageHide
})(PrescriptionList))