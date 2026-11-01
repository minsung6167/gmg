package com.gmg.service;

import com.gmg.domain.Favorite;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ClusteringService {
    public List<List<Favorite>> cluster(List<Favorite> places, int k) {
        List<Favorite> sorted = new ArrayList<>(places);
        sorted.sort((a, b) -> Double.compare(a.getMapx(), b.getMapx()));

        double[] centerX = new double[k];
        double[] centerY = new double[k];
        for (int i = 0; i < k; i++) {
            Favorite start = sorted.get(i * sorted.size() / k);
            centerX[i] = start.getMapx();
            centerY[i] = start.getMapy();
        }

        int max = (places.size() + k - 1) / k;
        List<List<Favorite>> groups = new ArrayList<>();

        for (int round = 0; round < 20; round++) {
            groups = new ArrayList<>();
            for (int i = 0; i < k; i++) {
                groups.add(new ArrayList<>());
            }

            List<double[]> pairs = new ArrayList<>();
            for (int p = 0; p < places.size(); p++) {
                for (int i = 0; i < k; i++) {
                    pairs.add(new double[] { distance(places.get(p), centerX[i], centerY[i]), p, i });
                }
            }
            pairs.sort((a, b) -> Double.compare(a[0], b[0]));

            boolean[] assigned = new boolean[places.size()];
            for (double[] pair : pairs) {
                int p = (int) pair[1];
                int i = (int) pair[2];
                if (assigned[p] || groups.get(i).size() >= max) {
                    continue;
                }
                groups.get(i).add(places.get(p));
                assigned[p] = true;
            }

            for (int i = 0; i < k; i++) {
                List<Favorite> group = groups.get(i);
                if (group.isEmpty()) {
                    continue;
                }
                double sumX = 0;
                double sumY = 0;
                for (Favorite place : group) {
                    sumX += place.getMapx();
                    sumY += place.getMapy();
                }
                centerX[i] = sumX / group.size();
                centerY[i] = sumY / group.size();
            }
        }
        return groups;
    }

    private double distance(Favorite place, double centerX, double centerY) {
        double dx = place.getMapx() - centerX;
        double dy = place.getMapy() - centerY;
        return dx * dx + dy * dy;
    }
}
