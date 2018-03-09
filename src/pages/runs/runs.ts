import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RunsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// Models
import { Run } from '../../models/run';

// Pages
import { ManifestPage } from '../manifest/manifest';

// Providers
import { RunProvider } from '../../providers/run/run';

@IonicPage()
@Component({
  selector: 'page-runs',
  templateUrl: 'runs.html',
})
export class RunsPage {
  
  runs: Run[] = [];

  highlightedRun: Run = {} as Run;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private runProvider: RunProvider) {
              this.highlightedRun = this.navParams.data.highlightedRun || {};
  }

  ionViewDidLoad() {
    this.runProvider.getRuns()
                          .subscribe((runs) => this.loadRuns(runs));
  }

  loadRuns(runs: Run[]) {
    this.runs = runs || [];
    if(!this.hasHighlightedRun()) {
      this.highlightedRun = this.runs.find(r => !r.completed()) || (new Run());
    }
  }

  setHighlightedRun(run: Run) {
    this.highlightedRun = run;
  }

  checkIfHighlightedRun(run: Run) {
    return this.hasHighlightedRun() && (run === this.highlightedRun || run.id == this.highlightedRun.id);
  }

  hasHighlightedRun() {
    return this.highlightedRun && this.highlightedRun.id;
  }

  loadManifest(run: Run) {
    this.setHighlightedRun(run);
    this.navCtrl.push(ManifestPage, {run: run});
  }

}
