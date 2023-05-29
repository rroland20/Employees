import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onSalaryChange = (e) => {
        this.setState({
            salary: e.target.value
        })
    }

    onSubmit = (e) => {
        const {name, salary} = this.state;
        if (name.length >= 3 && salary.length > 0) {
            e.preventDefault();
            this.props.onAddForm(name, salary);
            this.setState({
                name: '',
                salary: ''
            })
        }
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className='app-add-form'>
                <h3>Добавьте нового сотрудника</h3>
                <form className='add-form d-flex'
                        onSubmit={this.onSubmit}>
                    <input type="text"
                            className='form-control new-post-label'
                            placeholder='Как его зовут?'
                            name={name}
                            value={name}
                            onChange={this.onNameChange} />
                    <input type="number"
                            className='form-control new-post-label'
                            placeholder='З/П в $?'
                            name={salary}
                            value={salary}
                            onChange={this.onSalaryChange} />
                    <button type='submit'
                            className='btn btn-outline-light'>Добавить</button>
                </form>
            </div>
        );
    }
}

export default EmployeesAddForm;