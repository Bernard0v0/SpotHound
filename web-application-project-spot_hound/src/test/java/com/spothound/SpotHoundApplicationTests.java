package com.spothound;


import com.spothound.pojo.Timeslot;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SpotHoundApplicationTests {

	@Test
	void timeslotspotIdtest() {

			Timeslot timeslot = new Timeslot(1,10, LocalDateTime.of(2020,2,2,5,0,0),LocalDateTime.of(2020,2,3,5,0,0),5);
			timeslot.setSpotId(2);
			assertEquals(2,timeslot.getSpotId());

	}
	@Test
	void timeslotIdtest() {

		Timeslot timeslot = new Timeslot(1,10, LocalDateTime.of(2020,2,2,5,0,0),LocalDateTime.of(2020,2,3,5,0,0),5);
		timeslot.setTimeSlotId(3);
		assertEquals(3,timeslot.getTimeSlotId());

	}
	@Test
	void timeslotPricetest() {

		Timeslot timeslot = new Timeslot(1,10, LocalDateTime.of(2020,2,2,5,0,0),LocalDateTime.of(2020,2,3,5,0,0),5);
		timeslot.setPricePerQuarter(3);
		assertEquals(3,timeslot.getPricePerQuarter());

	}
	@Test
	void timeslotstarttimetest() {

		Timeslot timeslot = new Timeslot(1,10, LocalDateTime.of(2020,2,2,5,0,0),LocalDateTime.of(2020,2,3,5,0,0),5);
		timeslot.setStartTime(LocalDateTime.of(2020,2,2,5,0,1));
		assertEquals(LocalDateTime.of(2020,2,2,5,0,1),timeslot.getStartTime());

	}
	@Test
	void timeslotendtimetest() {

		Timeslot timeslot = new Timeslot(1,10, LocalDateTime.of(2020,2,2,5,0,0),LocalDateTime.of(2020,2,3,5,0,0),5);
		timeslot.setEndTime(LocalDateTime.of(2020,2,3,5,0,1));
		assertEquals(LocalDateTime.of(2020,2,3,5,0,1),timeslot.getEndTime());

	}

}
