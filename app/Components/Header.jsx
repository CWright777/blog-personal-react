import React, { Component, PropTypes } from 'react'
import api from '../Util/api'

export default class Header extends Component {
  addPost(){
    api.addPost({
      title: "Web development is rad",
      content: 
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. An me, inquis, tam amentem putas, ut apud imperitos isto modo loquar? Quasi ego id curem, quid ille aiat aut neget. Sed plane dicit quod intellegit. <b>Quod quidem nobis non saepe contingit.</b> Quia, si mala sunt, is, qui erit in iis, beatus non erit. Duo Reges: constructio interrete. </p><p>Quid, si reviviscant Platonis illi et deinceps qui eorum auditores fuerunt, et tecum ita loquantur? Quod ea non occurrentia fingunt, vincunt Aristonem; Ita credo. Pauca mutat vel plura sane; Quorum sine causa fieri nihil putandum est. At, si voluptas esset bonum, desideraret. Summus dolor plures dies manere non potest? Non laboro, inquit, de nomine. </p><p>Satisne ergo pudori consulat, si quis sine teste libidini pareat? Est igitur officium eius generis, quod nec in bonis ponatur nec in contrariis. Hoc dixerit potius Ennius: Nimium boni est, cui nihil est mali. An hoc usque quaque, aliter in vita? Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Dic in quovis conventu te omnia facere, ne doleas. Quid ergo hoc loco intellegit honestum? Quo modo autem philosophus loquitur? Illud dico, ea, quae dicat, praeclare inter se cohaerere. </p><p>Si longus, levis dictata sunt. Dicet pro me ipsa virtus nec dubitabit isti vestro beato M. <b>Ego vero isti, inquam, permitto.</b> <b>Quis Aristidem non mortuum diligit?</b> </p><p>Nunc haec primum fortasse audientis servire debemus. Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis praesidii. Terram, mihi crede, ea lanx et maria deprimet. Pollicetur certe. Omnium enim rerum principia parva sunt, sed suis progressionibus usa augentur nec sine causa; Hoc sic expositum dissimile est superiori. Quos quidem tibi studiose et diligenter tractandos magnopere censeo. Ne amores quidem sanctos a sapiente alienos esse arbitrantur. At enim sequor utilitatem. Omnes enim iucundum motum, quo sensus hilaretur. Qua igitur re ab deo vincitur, si aeternitate non vincitur? </p> ",
      createdAt: Date.now()
    })
  }
  render(){
    return(
      <div>
        <div className="header">
          <h1>Clifford Wright</h1>
        </div>
        <div className="navbar">
          <ul>
            <li>Home</li>
            <li>Blog</li>
            <li>Projects</li>
            <li>Technologies</li>
          </ul>
        </div>
        <button
          onClick={this.addPost.bind(this)}>
          daad
        </button>
      </div>
    )
  }
}

