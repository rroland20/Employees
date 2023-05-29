import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "John S.", salary: 800, increase: true, id: 1, star: false},
                {name: "Anton B.", salary: 3000, increase: false, id: 2, star: false},
                {name: "Margo K.", salary: 5000, increase: false, id: 3, star: false}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    onAddForm = (name, salary) => {
        const newObj = {name, salary, increase: false, id: this.maxId++, star: false};
        this.setState(({data}) => {
            return {
                data: data.concat(newObj)
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));
    }

    onChangeSalary = (id, value) => {
        const num = value.slice(0, -1);
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: num}
                }
                return item;
            })
        }))
    }

    searchEmployees = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        });
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'rise':
                return items.filter(item => item.star);
            case 'more':
                return items.filter(item => item.salary > 1000);
            default:
                console.log('Error');
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }
    
    onUpdateFilter = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;

        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmployees(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                    employees={employees}
                    increased={increased}
                />
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onUpdateFilter={this.onUpdateFilter}/>
                </div>
    
                <EmployeesList data={visibleData}
                               onDelete={id => this.deleteItem(id)}
                               onToggleProp={this.onToggleProp}
                               onChangeSalary={this.onChangeSalary}
                />
                <EmployeesAddForm onAddForm={this.onAddForm}/>
            </div>
        );
    }
}

export default App;