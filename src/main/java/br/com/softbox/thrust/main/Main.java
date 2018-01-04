package br.com.softbox.thrust.main;

import br.com.softbox.thrust.core.ThrustCore;

public class Main {
	public static void main(String[] args) {
		if(args.length < 1) {
			return;
		}
		
		if(args[0].startsWith("-")) {
			//TODO: implement options mechanism
			System.out.println("Sorry, options mechanism not implemented yet. Please, try again in next versions.");
		} else {
			try {
				ThrustCore thrustCore = new ThrustCore();
				String mainScript = ThrustCore.require(args[0], true);
				thrustCore.eval(mainScript);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
