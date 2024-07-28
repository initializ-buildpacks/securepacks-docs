
import './style.css'

const ShowCveLogs = ({cveData}) => {

    let names = cveData.map(vuln => vuln.artifact.name);
    names.unshift('NAME')

    let installedVersion = cveData.map(vuln => vuln.artifact.version);
    installedVersion.unshift('INSTALLED')

    let fixedInVersions = cveData.map(vuln => {
        if(vuln.vulnerability.fix.state == "fixed") return vuln.vulnerability.fix.versions[0];
        else return vuln.vulnerability.fix.state;
    });
    fixedInVersions.unshift('FIXED-IN')
    
    let types = cveData.map(vuln => vuln.artifact.type);
    types.unshift('TYPE')

    let vulnerabilities = cveData.map(vuln => vuln.vulnerability.id);
    vulnerabilities.unshift('VULNERABILITY')

    let severities = cveData.map(vuln => vuln.vulnerability.severity);
    severities.unshift('SEVERITY')
  
    return <div className="cve-body">
                <div className='cve-col'>
                    {names.map((val) => <div className='cve-field'>{val}</div>)}
                </div>
                <div className='cve-col'>
                    {installedVersion.map((val) => <div className='cve-field'>{val}</div>)}
                </div>
                <div className='cve-col'>
                    {fixedInVersions.map((val) => <div className='cve-field'>{val}</div>)}
                </div>
                <div className='cve-col'>
                    {types.map((val) => <div className='cve-field'>{val}</div>)}
                </div>
                <div className='cve-col'>
                    {vulnerabilities.map((val) => <div className='cve-field'>{val}</div>)}
                </div>
                <div className='cve-col'>
                    {severities.map((val) => <div className='cve-field'>{val}</div>)}
                </div>
            </div>
}

export default ShowCveLogs